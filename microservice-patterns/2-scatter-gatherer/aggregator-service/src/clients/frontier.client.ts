import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, EMPTY } from 'rxjs';
import { FlightResultDto } from 'src/dtos/flight-result.dto';

@Injectable()
export class FrontierServiceClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3002/frontier-flights'
    }

    findFlights(from: string, to: string): Observable<FlightResultDto[]> {
        return this.http.post(`${this.baseUrl}`, {
            from,
            to
        })
            .pipe(
                map(res => res.data?.data),
                catchError(err => EMPTY)
            )
    }
}