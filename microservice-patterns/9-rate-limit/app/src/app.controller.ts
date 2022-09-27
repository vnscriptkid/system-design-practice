import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler'
import { map, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this._fibonacci = this._fibonacci.bind(this);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle(5, 20)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/fibo')
  calculateFibo(@Query('n') n: string): Observable<{ data: number }> {
    return this.appService.callExternalServiceToCalFibo(+n)
      .pipe(
        map(x => ({ data: x }))
      )
  }

  /* ASSUMING THIS IS ON THIRD-PARTY SERVICE */
  @Get('/fibo-service')
  heavyWorkOnThirdPartyService(@Query('n') n: string) {
    return { result: this._fibonacci(+n) };
  }

  private _fibonacci(n: number) {
    if (n <= 1) return n;

    return this._fibonacci(n - 1) + this._fibonacci(n - 2);
  }
}
