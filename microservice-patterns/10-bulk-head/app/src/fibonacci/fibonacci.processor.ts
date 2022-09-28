import { Process, Processor } from '@nestjs/bull';
import { Job, DoneCallback } from 'bull';

@Processor('fibonacci')
export class FibonacciProcessor {
    @Process('calculate')
    process(job: Job, done: DoneCallback) {
        const { n } = job.data;

        if (typeof n !== 'number') {
            done(new Error('n is not a number'));
            return;
        }

        const result = FibonacciProcessor.calculate(n);

        done(null, result);
    }

    static calculate(n: number) {
        if (n <= 1) return n;

        return FibonacciProcessor.calculate(n - 1) + FibonacciProcessor.calculate(n - 2);
    }
}