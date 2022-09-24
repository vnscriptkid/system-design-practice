import { Address } from "./Address";
import { Status } from "./Status";

export class ShippingResponse {
    orderId: number;
    status: Status;
    expectedDelivery: Date;
    address: Address;

    constructor(attrs: ShippingResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: ShippingResponse) {
        return new ShippingResponse(attrs);
    }
}