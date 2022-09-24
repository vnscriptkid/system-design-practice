import { ReservationItemRequest } from "src/dtos/ReservationItemRequest";
import { ReservationHandler } from "./ReservationHandler";
import { Observable, of, groupBy, mergeMap, map, toArray, from } from 'rxjs';
import { ReservationType } from "src/dtos/ReservationType";
import { ReservationResponse } from "src/dtos/ReservationResponse";
import { ReservationItemResponse } from "../dtos/ReservationItemResponse";

export class ReservationService {
    private readonly typeToHandler: Map<ReservationType, ReservationHandler>;

    constructor(
        private readonly handlers: Array<ReservationHandler>
    ) {
        this.handlers.forEach(handler => {
            this.typeToHandler.set(handler.getType(), handler)
        })
    }

    reserve(req: ReservationItemRequest[]): Observable<ReservationResponse> {
        return from(req).pipe(
            groupBy(req => req.type),
            mergeMap(group => this.typeToHandler.get(group.key).reserve(group.pipe())),
            toArray(),
            map(this._toReservationResponse)
        )
    }

    private _toReservationResponse(list: Array<ReservationItemResponse>): ReservationResponse {
        return ReservationResponse.build({
            reservationId: Date.now().toString(),
            price: list.reduce((acc, cur) => acc + cur.price, 0),
            items: list
        })
    }
}