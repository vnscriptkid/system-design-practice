import Queue, { ProcessCallbackFunction, Queue as BullQueue } from "bull";
import { sendVerificationEmail } from ".";

export class EmailQueue {

    private static readonly CONCURRENCY_FACTORS = 3;

    queue: BullQueue;

    constructor() {
        // initialize queue
        this.queue = new Queue('verification-email', {
            redis: {
                host: 'localhost',
                port: 6379
            }
        });
        // add a worker
        this.queue.process(EmailQueue.CONCURRENCY_FACTORS, this.process)
    }

    async add(job: any) {
        await this.queue.add(job, { attempts: 5, backoff: { type: 'exponential' } });
    }

    process: ProcessCallbackFunction<any> = async (job, done) => {
        const payload = job.data;
        try {
            await sendVerificationEmail(payload.email);
            done(null)
        } catch (err) {
            console.log('retrying: ' + payload.email)
            done(err as any);
        }
    }
}

export const emailQueue = new EmailQueue();