import Redlock from 'redlock';
import RedisClient from 'ioredis';

let redis: RedisClient;
let redlock: Redlock;

export async function connectRedis() {
    if (!redis) {
        redis = new RedisClient({ lazyConnect: true });

        await redis.connect()

        console.log('REDIS connected');
    }

    return redis;
}

export function getRedlock() {
    if (!redis) {
        throw new Error('Redis is not available');
    }

    if (!redlock) {
        redlock = new Redlock(
            // You should have one client for each independent  node
            // or cluster.
            [redis],
            {
                // The expected clock drift; for more details see:
                // http://redis.io/topics/distlock
                // driftFactor: 0.01, // multiplied by lock ttl to determine drift time
                // The max number of times Redlock will attempt to lock a resource
                // before erroring.
                retryCount: 0,
                // the time in ms between attempts
                // retryDelay: 100, // time in ms
                // the max time in ms randomly added to retries
                // to improve performance under high contention
                // see https://www.awsarchitectureblog.com/2015/03/backoff.html
                // retryJitter: 200, // time in ms
                // The minimum remaining time on a lock before an extension is automatically
                // attempted with the `using` API.
                // automaticExtensionThreshold: 500, // time in ms
            }
        );
    }

    return redlock;
}