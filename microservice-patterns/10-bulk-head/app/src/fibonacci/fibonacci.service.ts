import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class FibonacciService {
    constructor(
        @InjectQueue('fibonacci') private readonly fiboQueue: Queue
    ) {
    }

    async start(n: number) {
        const job = await this.fiboQueue.add('calculate', {
            n
        })

        return { jobId: job.id }
    }


}
