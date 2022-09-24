export class ShippingRequest {
    userId: number;
    orderId: number;

    constructor(attrs: ShippingRequest) {
        Object.assign(this, attrs);
    }

    public static build(attrs: ShippingRequest) {
        return new ShippingRequest(attrs);
    }
} 