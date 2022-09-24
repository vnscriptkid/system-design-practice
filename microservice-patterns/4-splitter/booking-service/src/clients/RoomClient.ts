import { HttpService } from '@nestjs/axios'
import { map, tap, Observable, catchError, EMPTY } from 'rxjs'
import { RoomReservationRequest } from 'src/dtos/RoomReservationRequest';
import { RoomReservationResponse } from 'src/dtos/RoomReservationResponse';

export class RoomClient {
    baseURL: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseURL = 'http://localhost:3001/room-reservations'
    }

    reserve(req: RoomReservationRequest): Observable<RoomReservationResponse> {
        return this.http.post(this.baseURL, req)
            .pipe(
                catchError(err => {
                    console.error(`[reserve] err ${JSON.stringify(err)}`)
                    return EMPTY;
                }),
                map(res => res.data),
                tap(console.log),
                map(resBody => RoomReservationResponse.build(resBody))
            )
    }
}