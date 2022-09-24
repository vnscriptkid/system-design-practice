import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, EMPTY, of } from 'rxjs';
import { FlightResultDto } from 'src/dtos/flight-result.dto';

@Injectable()
export class DeltaServiceClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3003/delta-flights'
    }

    findFlights(from: string, to: string): Observable<FlightResultDto[]> {
        return this.http.get(`${this.baseUrl}/${from}/${to}`)
            .pipe(
                map(res => res.data?.data),
                catchError(err => of([]))
            )
    }
}