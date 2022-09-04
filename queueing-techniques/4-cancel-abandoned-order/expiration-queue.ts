import Queue, { ProcessCallbackFunction, Queue as BullQueue } from "bull";
import { cancelOrder } from "./ordersDb";

export class OrderExpirationQueue {

    private static readonly CONCURRENCY_FACTORS = 3;

    queue: BullQueue;

    constructor() {
        // initialize queue
        this.queue = new Queue('order-expiration-queue', {
            redis: {
                host: 'localhost',
                port: 6379
            },
            // defaultJobOptions: {
            //     backoff: 10 * 1000, // 10 sec
            //     attempts: 5
            // }
            defaultJobOptions: {
                // delay: 5 * 1000
                repeat: {
                    every: 5 * 1000,
                }
            }
        });
        // add a worker
        this.queue.process(OrderExpirationQueue.CONCURRENCY_FACTORS, this.process)
    }

    async add(payload: any) {
        // await this.queue.add(`expire-order-${payload.orderId}`, payload);
        await this.queue.add({
            ...payload,
            endsAt: Date.now() + 20 * 1000
        }, { jobId: this._getJobId(payload.orderId) });
    }

    private _getJobId(orderId: string): string {
        return `expire-order-${orderId}`
    }

    process: ProcessCallbackFunction<any> = async (job) => {
        const { orderId, endsAt } = job.data || {};

        if (!orderId) {
            console.log('orderId missing');
            return;
        }

        if (Date.now() < endsAt) {
            remindUserEvery5s(orderId);
            return;
        }

        cancelOrder(orderId);
        const key = (job.opts.repeat as any).key;
        await this.queue.removeRepeatableByKey(key);
        // await this.queue.removeRepeatable({ jobId: job.id })
        // await this.queue.removeRepeatable({ jobId: job.opts.jobId, every: 5 * 1000 })
        console.log('DONE', key)
        // try {
        //     done(null)
        // } catch (err) {
        //     console.log('retrying: ' + orderId)
        //     done(err as any);
        // }
    }
}

export const orderExpirationQueue = new OrderExpirationQueue();

function remindUserEvery5s(orderId: any) {
    console.log('reminding user through SMS ...')
}
