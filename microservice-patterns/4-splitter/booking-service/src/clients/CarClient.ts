import { HttpService } from '@nestjs/axios'
import { map, tap, Observable, catchError, EMPTY } from 'rxjs'
import { CarReservationRequest } from 'src/dtos/CarReservationRequest';
import { CarReservationResponse } from 'src/dtos/CarReservationResponse';

export class CarClient {
    baseURL: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseURL = 'http://localhost:3001/car-reservations'
    }

    reserve(req: CarReservationRequest): Observable<CarReservationResponse> {
        return this.http.post(this.baseURL, req)
            .pipe(
                catchError(err => {
                    console.error(`[reserve] err ${JSON.stringify(err)}`)
                    return EMPTY;
                }),
                map(res => res.data),
                tap(console.log),
                map(resBody => CarReservationResponse.build(resBody))
            )
    }
}