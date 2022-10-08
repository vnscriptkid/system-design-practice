import Redis from 'ioredis';
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

    public readSyncAllTheTime(streamKey: string): Promise<any> {
        return this.redis.call('xread', 'streams', streamKey, '0-0')
    }

    public readSyncSince(streamKey: string, exclusiveSince: string = '$'): Promise<any> {
        return this.redis.call('xread', 'streams', streamKey, exclusiveSince)
    }

    public readSomeSyncSince(streamKey: string, exclusiveSince: string = '$', limit?: number): Promise<any> {
        return this.redis.call('xread',
            ...(typeof limit === 'number' ? ['count', limit] : []),
            ...['streams', streamKey, exclusiveSince]
        )
    }

    public readAsync(streamKey: string, durationMillis: number, exclusiveSince: string = '$'): Promise<any> {
        return this.redis.call('xread', 'block', durationMillis, 'streams', streamKey, exclusiveSince)
    }

    async ordinaryListen(streamKey: string, durationMillis: number = 5000, exclusiveSince: string = '$') {
        const result = await this.redis.call('xread', 'block', durationMillis, 'streams', streamKey, exclusiveSince)

        return result;
    }
}