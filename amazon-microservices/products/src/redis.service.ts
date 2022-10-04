import { Injectable } from '@nestjs/common';
import { BaseRedisService, ProductData, ProductCreatedEvent } from '@kidsorg/amazon-common'

@Injectable()
export class RedisService extends BaseRedisService {
    getServiceName(): string {
        return 'products';
    }

    public publishProductCreated(data: ProductData) {
        return this.publish(new ProductCreatedEvent(data));
    }
}