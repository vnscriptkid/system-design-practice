export class RoomReservationResponse {
    reservationId: string;
    price: number;
    city: string;
    checkIn: Date;
    checkOut: Date;
    category: string;

    constructor(attrs: RoomReservationResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: RoomReservationResponse) {
        return new RoomReservationResponse(attrs);
    }
}