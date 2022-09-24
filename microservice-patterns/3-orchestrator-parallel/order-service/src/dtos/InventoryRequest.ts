export class InventoryRequest {
    userId: number;
    productId: number;
    quantity: number;

    constructor(attrs: InventoryRequest) {
        Object.assign(this, attrs);
    }

    public static build(attrs: InventoryRequest) {
        return new InventoryRequest(attrs);
    }
} 