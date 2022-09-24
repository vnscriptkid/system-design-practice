import { ReservationType } from "./ReservationType";

export class ReservationItemRequest {
    type: ReservationType;
    city: string;
    category: string;
    from: Date;
    to: Date;
}