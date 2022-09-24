import { Status } from "./Status";

export class InventoryResponse {
    productId: number;
    quantity: number;
    remainingQuantity: number;
    status: Status;

    constructor(attrs: InventoryResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: InventoryResponse) {
        return new InventoryResponse(attrs);
    }
}