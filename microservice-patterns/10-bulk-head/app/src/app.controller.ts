import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler'
import { map, Observable } from 'rxjs';
import { FibonacciService } from './fibonacci/fibonacci.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fiboService: FibonacciService) {
  }

  @UseGuards(ThrottlerGuard)
  @Throttle(5, 20)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // This will block event-loop
  // So as long as this is still running, other apis will be blocked
  // Need isolation from others (by running on separate process)
  @Get('/cpu-task')
  cpuIntensiveTask(@Query('n') n: string) {
    return this.fiboService.start(+n);
  }

  @Get('/io-task')
  ioTask() {
    return this.appService.readTodos();
  }
}
