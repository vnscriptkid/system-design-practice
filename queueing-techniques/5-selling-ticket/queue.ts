import Queue, { ProcessCallbackFunction, Queue as BullQueue } from "bull";

export class EmailQueue {

    private static readonly CONCURRENCY_FACTORS = 3;

    queue: BullQueue;

    constructor() {
        // initialize queue
        this.queue = new Queue('ticket-info-email', {
            redis: {
                host: 'localhost',
                port: 6379
            }
        });
        // add a worker
        this.queue.process(EmailQueue.CONCURRENCY_FACTORS, this.process)
    }

    async add(job: any, delay: number) {
        await this.queue.add(job, { delay, attempts: 5, backoff: { type: 'exponential' } });
    }

    process: ProcessCallbackFunction<any> = async (job, done) => {
        const payload = job.data;
        try {
            await sendVerificationEmail();
            done(null)
        } catch (err) {
            done(err as any);
        }
    }
}

async function sendVerificationEmail() {
    console.log('...sending email')
}

export const emailQueue = new EmailQueue();