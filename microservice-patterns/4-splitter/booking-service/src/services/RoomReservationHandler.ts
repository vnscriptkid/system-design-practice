import { ReservationItemRequest } from "src/dtos/ReservationItemRequest";
import { ReservationItemResponse } from "src/dtos/ReservationItemResponse";
import { ReservationType } from "src/dtos/ReservationType";
import { ReservationHandler } from "./ReservationHandler";
import { of, map, mergeMap, Observable } from 'rxjs';
import { RoomClient } from "src/clients/RoomClient";
import { RoomReservationRequest } from "src/dtos/RoomReservationRequest";
import { RoomReservationResponse } from "src/dtos/RoomReservationResponse";

export class RoomReservationHandler extends ReservationHandler {
    constructor(
        private readonly roomClient: RoomClient
    ) {
        super();
    }

    public getType(): ReservationType {
        return ReservationType.room;
    }

    public reserve(req: Observable<ReservationItemRequest>): Observable<ReservationItemResponse> {
        return req
            .pipe(
                map(this._transformRequest),
                mergeMap(this.roomClient.reserve),
                map(this._transformResponse)
            )
    }

    private _transformRequest(req: ReservationItemRequest) {
        return RoomReservationRequest.build({
            category: req.category,
            city: req.city,
            checkIn: req.from,
            checkOut: req.to
        })
    }

    private _transformResponse(res: RoomReservationResponse): ReservationItemResponse {
        return ReservationItemResponse.build({
            category: res.category,
            city: res.city,
            from: res.checkIn,
            to: res.checkOut,
            price: res.price,
            reservationId: res.reservationId,
            type: ReservationType.room,
        })
    }
}