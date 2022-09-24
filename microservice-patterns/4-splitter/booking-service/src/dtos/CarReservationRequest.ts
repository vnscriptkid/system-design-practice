export class CarReservationRequest {
    city: string;
    pickup: Date;
    drop: Date;
    category: string;

    constructor(attrs: CarReservationRequest) {
        Object.assign(this, attrs);
    }

    static build(attrs: CarReservationRequest) {
        return new CarReservationRequest(attrs);
    }
}