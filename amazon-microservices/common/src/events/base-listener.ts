import Redis from 'ioredis';
import { EventTypes } from './event-types';

interface Event {
    type: EventTypes;
    data: any;
}

export abstract class Listener<T extends Event> {
    // abstract type: T['type'];
    // abstract consumerGroupName: string; // email-service
    // abstract consumerName: string; // email-service-node-1

    protected client: Redis;

    abstract streamKey: string;

    constructor(client: Redis) {
        this.client = client;
    }

    public async listenForMessage(blockTimeMs: number, lastId = "$") {
        // `results` is an array, each element of which corresponds to a key.
        // Because we only listen to one key (mystream) here, `results` only contains
        // a single element. See more: https://redis.io/commands/xread#return-value
        const results = await this.client.xread("BLOCK", blockTimeMs, "STREAMS", this.streamKey, lastId);

        const [key, messages] = results![0]; // `key` equals to "mystream"

        messages.forEach(this.processMessage);

        // Pass the last id of the results to the next round.
        await this.listenForMessage(blockTimeMs, messages[messages.length - 1][0]);
    }

    public abstract processMessage(data: T['data']): void;
}
