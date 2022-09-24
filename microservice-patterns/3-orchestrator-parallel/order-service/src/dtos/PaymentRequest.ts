export class PaymentRequest {
    userId: number;
    orderId: number;
    amount: number;

    constructor(attrs: PaymentRequest) {
        Object.assign(this, attrs);
    }

    public static build(attrs: PaymentRequest) {
        return new PaymentRequest(attrs);
    }
}