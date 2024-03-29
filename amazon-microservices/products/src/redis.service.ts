import { Injectable } from '@nestjs/common';
import { ProductData, EventTypes, AppEvent } from '@kidsorg/amazon-common'
import { BaseRedisService } from './base-redis.service';

export class ProductCreatedEvent extends AppEvent {
    public readonly type = EventTypes.ProductCreated;

    constructor(
        public readonly data: ProductData
    ) {
        super()
    }
}

@Injectable()
export class RedisService extends BaseRedisService {
    getServiceName(): string {
        return 'products';
    }

    public publishProductCreated(data: ProductData) {
        return this.publish(new ProductCreatedEvent(data));
    }
}