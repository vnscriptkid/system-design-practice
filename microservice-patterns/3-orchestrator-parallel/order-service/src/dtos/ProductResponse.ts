export class ProductResponse {
    productId: number;
    category: string;
    description: string;
    price: number;

    constructor(attrs: ProductResponse) {
        Object.assign(this, attrs);
    }

    static build(attrs: ProductResponse) {
        return new ProductResponse(attrs);
    }
}