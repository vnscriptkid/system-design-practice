import { AppEvent, EventTypes, ProductData } from '@kidsorg/amazon-common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import Redis from 'ioredis';
import { CreateProductAction } from './actions/create-product.action';
import { AppModule } from './app.module';
import { Product } from './models/product.entity';

interface Event {
  type: EventTypes;
  data: any;
}

export class ProductCreatedEvent extends AppEvent {
  public readonly type = EventTypes.ProductCreated;

  constructor(
    public readonly data: ProductData
  ) {
    super()
  }
}

export abstract class Listener<T extends Event> {
  protected client: Redis;

  abstract getStreamKey(): string;

  constructor(client: Redis) {
    this.client = client;
    this.listenForMessage = this.listenForMessage.bind(this);
    this.processMessage = this.processMessage.bind(this);
  }

  public async listenForMessage(blockTimeMs: number, lastId = "$") {
    console.log(`[listenForMessage] start from ${lastId}`)
    // `results` is an array, each element of which corresponds to a key.
    // Because we only listen to one key (mystream) here, `results` only contains
    // a single element. See more: https://redis.io/commands/xread#return-value
    const results = await this.client.xread("BLOCK", blockTimeMs, "STREAMS", this.getStreamKey(), lastId);

    if (results) {
      const [key, messages] = results[0]; // `key` equals to "mystream"

      messages
        .map(this.deserializeStreamMessage)
        .map(x => x.message.event)
        .filter(x => x.type === this.getType())
        .map(x => x.data)
        .forEach(this.processMessage);

      // Pass the last id of the results to the next round.
      lastId = messages[messages.length - 1][0];
    }

    await this.listenForMessage(blockTimeMs, lastId);
  }

  public deserializeStreamMessage(msg: any) {
    const [ts, content] = msg;
    const [kEvent, vEvent, kService, vService, kCreatedAt, vCreatedAt] = content;

    return {
      timestamp: ts,
      message: {
        event: JSON.parse(vEvent),
        service: vService,
        createdAt: new Date(vCreatedAt)
      }
    }
  }

  public abstract processMessage(data: T['data']): any;
  public abstract getType(): EventTypes;
}


class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  private _productsRepo: typeof Product = null;

  getType() {
    return EventTypes.ProductCreated;
  }

  getRepo() {
    if (!this._productsRepo) {
      throw new Error('uninitialized')
    }

    return this._productsRepo;
  }

  setRepo(repo: typeof Product) {
    this._productsRepo = repo;

    return this;
  }

  getStreamKey(): string {
    return 'events';
  }

  public async processMessage(data: ProductData) {
    try {
      await new CreateProductAction(this.getRepo()).execute(data);
      console.info(`[processMessage] product inserted`)
    } catch (err) {
      console.error(`[processMessage] product insertion failed: `, err)
    }
  }

}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const redis = app.get(Redis)
  const productsRepo = app.get('PRODUCTS_REPOSITORY') as typeof Product;

  new ProductCreatedListener(redis)
    .setRepo(productsRepo)
    .listenForMessage(3000);

  await app.listen(3001);
}
bootstrap();

