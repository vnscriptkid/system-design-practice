import { Injectable } from '@nestjs/common';
import { map, Observable, zip } from 'rxjs';
import { DeltaServiceClient } from './clients/delta.client';
import { FrontierServiceClient } from './clients/frontier.client';
import { JetblueServiceClient } from './clients/jetblue.client';
import { FlightResultDto } from './dtos/flight-result.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly deltaClient: DeltaServiceClient,
    private readonly frontierClient: FrontierServiceClient,
    private readonly jetblueClient: JetblueServiceClient,
  ) { }

  aggregateFlights(from: string, to: string): Observable<FlightResultDto[]> {
    return zip(
      this.deltaClient.findFlights(from, to),
      this.frontierClient.findFlights(from, to),
      this.jetblueClient.findFlights(from, to)
    ).pipe(
      map(([x, y, z]) => ([
        ...x,
        ...y,
        ...z
      ]))
    )
  }
}
