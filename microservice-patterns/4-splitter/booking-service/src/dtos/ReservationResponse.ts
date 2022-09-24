import { ReservationItemRequest } from "./ReservationItemRequest";
import { ReservationType } from "./ReservationType";

export class ReservationResponse {
    reservationId: string;
    price: number;
    items: Array<ReservationItemRequest>

    constructor(attrs: ReservationResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: ReservationResponse) {
        return new ReservationResponse(attrs);
    }
}