import { Status } from "./Status";

export class PaymentResponse {
    userId: number;
    name: string;
    balance: number;
    status: Status

    constructor(attrs: PaymentResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: PaymentResponse) {
        return new PaymentResponse(attrs);
    }
}