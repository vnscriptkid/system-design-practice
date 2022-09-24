import { CarClient } from "src/clients/CarClient";
import { ReservationItemRequest } from "src/dtos/ReservationItemRequest";
import { ReservationItemResponse } from "src/dtos/ReservationItemResponse";
import { ReservationType } from "src/dtos/ReservationType";
import { ReservationHandler } from "./ReservationHandler";
import { of, map, mergeMap, Observable } from 'rxjs';
import { CarReservationRequest } from "src/dtos/CarReservationRequest";
import { CarReservationResponse } from "src/dtos/CarReservationResponse";

export class CarReservationHandler extends ReservationHandler {
    constructor(
        private readonly carClient: CarClient
    ) {
        super();
    }

    public getType(): ReservationType {
        return ReservationType.car;
    }
    public reserve(req: Observable<ReservationItemRequest>): Observable<ReservationItemResponse> {
        return req
            .pipe(
                map(this._transformRequest),
                mergeMap(this.carClient.reserve),
                map(this._transformResponse)
            )
    }

    private _transformRequest(req: ReservationItemRequest) {
        return CarReservationRequest.build({
            category: req.category,
            city: req.city,
            pickup: req.from,
            drop: req.to
        })
    }

    private _transformResponse(res: CarReservationResponse): ReservationItemResponse {
        return ReservationItemResponse.build({
            category: res.category,
            city: res.city,
            from: res.pickup,
            to: res.drop,
            price: res.price,
            reservationId: res.reservationId,
            type: ReservationType.car,
        })
    }
}