export class CarReservationResponse {
    reservationId: string;
    price: number;
    city: string;
    pickup: Date;
    drop: Date;
    category: string;

    constructor(attrs: CarReservationResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: CarReservationResponse) {
        return new CarReservationResponse(attrs);
    }
}