import { Status } from "./Status";
import { Address } from "./Address";

export class OrderResponse {
    userId: number;
    productId: number;
    orderId: number;
    status: Status;
    address: Address;
    expectedDelivery: Date;

    constructor(attrs: OrderResponse) {
        Object.assign(this, attrs);
    }

    public static build(attrs: OrderResponse) {
        return new OrderResponse(attrs);
    }
}