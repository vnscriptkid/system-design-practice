import { Redis } from 'ioredis';
import { AppEvent } from '../events/event';

export abstract class BaseRedisService {
    public readonly ALL_EVENTS_KEY = 'events';

    public constructor(
        public readonly redis: Redis
    ) { }

    public abstract getServiceName(): string;

    public publish(event: AppEvent) {
        return this.redis.xadd(
            this.ALL_EVENTS_KEY,
            '*',
            ...[
                ...['event', event.toJSON()],
                ...['service', this.getServiceName()],
                ...['createdAt', new Date().toISOString()]
            ]
        )
    }
}