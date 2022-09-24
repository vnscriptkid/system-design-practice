import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, EMPTY } from 'rxjs';
import { FlightResultDto } from 'src/dtos/flight-result.dto';

@Injectable()
export class JetblueServiceClient {
    private readonly baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3001/jetblue-flights'
    }

    findFlights(from: string, to: string): Observable<FlightResultDto[]> {
        return this.http.get(`${this.baseUrl}/${from}/${to}`)
            .pipe(
                map(res => this.normalizeResponse(res, from, to)),
                catchError(err => EMPTY)
            )
    }

    normalizeResponse(res: any, from: string, to: string) {
        return (res.data?.data || []).map(x => ({
            ...x,
            airline: "JETBLUE",
            from,
            to
        }))
    }
}