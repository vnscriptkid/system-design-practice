import { Injectable } from '@nestjs/common';
import { ProductData, ProductCreatedEvent } from '@kidsorg/amazon-common'
import { BaseRedisService } from './src/base-redis.service';

@Injectable()
export class RedisService extends BaseRedisService {
    getServiceName(): string {
        return 'products';
    }

    public publishProductCreated(data: ProductData) {
        return this.publish(new ProductCreatedEvent(data));
    }
}