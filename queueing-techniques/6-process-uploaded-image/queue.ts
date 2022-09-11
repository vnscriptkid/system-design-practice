import Queue, { ProcessCallbackFunction, Queue as BullQueue } from "bull";
import sharp from "sharp";

type JobPayload = {
    fileName: string;
}

export class ImageProcessQueue {

    private static readonly CONCURRENCY_FACTORS = 3;

    queue: BullQueue;

    constructor() {
        // initialize queue
        this.queue = new Queue('image-processor', {
            redis: {
                host: 'localhost',
                port: 6379
            }
        });
        // add a worker
        this.queue.process(ImageProcessQueue.CONCURRENCY_FACTORS, this.process)
    }

    async add(job: JobPayload) {
        await this.queue.add(job, { attempts: 5, backoff: { type: 'exponential' } });
    }

    process: ProcessCallbackFunction<any> = async (job, done) => {
        const { fileName } = job.data;


        try {
            const meta = await sharp(`uploads/unprocessed/${fileName}.png`)
                .resize({
                    width: 150,
                    height: 97
                })
                .toFormat("jpeg", { mozjpeg: true })
                .toFile(`uploads/processed/${fileName}.jpeg`);

            console.log(`^^ done processing file`, meta);

            done(null)
        } catch (err) {
            done(err as any);
        }
    }
}

export const imageProcessQueue = new ImageProcessQueue();