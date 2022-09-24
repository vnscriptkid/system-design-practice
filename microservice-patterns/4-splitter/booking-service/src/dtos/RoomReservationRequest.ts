export class RoomReservationRequest {
    city: string;
    checkIn: Date;
    checkOut: Date;
    category: string;

    constructor(attrs: RoomReservationRequest) {
        Object.assign(this, attrs);
    }

    static build(attrs: RoomReservationRequest) {
        return new RoomReservationRequest(attrs);
    }
}