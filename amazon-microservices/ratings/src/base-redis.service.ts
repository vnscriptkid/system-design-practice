import { Injectable } from '@nestjs/common';
import { AppEvent } from '@kidsorg/amazon-common';
import Redis from 'ioredis';

@Injectable()
export abstract class BaseRedisService {
    public readonly ALL_EVENTS_KEY = 'events';

    public constructor(
        public readonly redis: Redis
    ) { }

    public abstract getServiceName(): string;

    public publish(event: AppEvent) {
        console.log(JSON.stringify(event.toJSON()))

        return this.redis.xadd(
            this.ALL_EVENTS_KEY,
            '*',
            ...[
                ...['event', JSON.stringify(event.toJSON())],
                ...['service', this.getServiceName()],
                ...['createdAt', new Date().toISOString()]
            ]
        )
    }
}