import { HttpService } from '@nestjs/axios';
import { Injectable, UseGuards } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { FiboThrottle } from './guards/fibo-limit.guard';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  // @UseGuards(FiboThrottle)
  @Throttle(5 /* reqs */, 20 /* secs */)
  callExternalServiceToCalFibo(n: number): Observable<number> {
    console.log('running')
    return this.httpService.get<{ result: number }>(`http://localhost:3000/fibo-service?n=${n}`)
      .pipe(
        map(x => x.data.result)
      )
  }
}
