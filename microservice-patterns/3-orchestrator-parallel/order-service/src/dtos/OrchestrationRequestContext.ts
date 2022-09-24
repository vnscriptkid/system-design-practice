import { InventoryRequest } from "./InventoryRequest";
import { InventoryResponse } from "./InventoryResponse";
import { OrderRequest } from "./OrderRequest";
import { PaymentRequest } from "./PaymentRequest";
import { PaymentResponse } from "./PaymentResponse";
import { ShippingRequest } from "./ShippingRequest";
import { ShippingResponse } from "./ShippingResponse";
import { Status } from "./Status";

export class OrchestrationRequestContext {
    orderId: number;
    orderRequest: OrderRequest;
    productPrice: number;
    paymentRequest: PaymentRequest;
    paymentResponse: PaymentResponse;
    inventoryRequest: InventoryRequest;
    inventoryResponse: InventoryResponse;
    shippingRequest: ShippingRequest;
    shippingResponse: ShippingResponse;
    status: Status;

    constructor(attrs: Partial<OrchestrationRequestContext>) {
        Object.assign(this, attrs);
    }

    static build(attrs: Partial<OrchestrationRequestContext>) {
        return new OrchestrationRequestContext(attrs);
    }
}