import { Module } from '@nestjs/common';
import { FibonacciService } from './fibonacci.service';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: "fibonacci",
      processors: [{
        name: 'calculate',
        path: join(__dirname, 'fibonacci.processor.js')
      }]
    })
  ],
  providers: [FibonacciService],
  exports: [FibonacciService]
})
export class FibonacciModule { }
