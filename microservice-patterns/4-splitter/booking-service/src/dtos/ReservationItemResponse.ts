import { ReservationType } from "./ReservationType";

export class ReservationItemResponse {
    reservationId: string;
    price: number;
    type: ReservationType;
    city: string;
    category: string;
    from: Date;
    to: Date;

    constructor(attrs: ReservationItemResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: ReservationItemResponse) {
        return new ReservationItemResponse(attrs);
    }
}