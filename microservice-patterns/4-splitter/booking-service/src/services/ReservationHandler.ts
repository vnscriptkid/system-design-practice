import { ReservationItemRequest } from "src/dtos/ReservationItemRequest";
import { ReservationItemResponse } from "src/dtos/ReservationItemResponse";
import { ReservationType } from "src/dtos/ReservationType";
import { Observable } from 'rxjs'

export abstract class ReservationHandler {
    public abstract getType(): ReservationType;
    public abstract reserve(req: Observable<ReservationItemRequest>): Observable<ReservationItemResponse>;
}