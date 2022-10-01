import { ProductData } from "../dtos/product-data";
import { AppEvent } from "./event";

export class ProductCreatedEvent extends AppEvent {
    constructor(
        private readonly data: ProductData
    ) {
        super()
    }
}