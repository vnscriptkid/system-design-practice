import { ProductData } from "@kidsorg/amazon-common";
import { Product } from "src/models/product.entity";

export class CreateProductAction {
    constructor(
        private readonly productsRepo: typeof Product,
    ) { }

    public async execute(data: ProductData) {
        return this.productsRepo.create({
            id: data.id,
            name: data.name,
            price: data.price,
        })
    }
}