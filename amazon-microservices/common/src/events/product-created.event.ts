import { ProductData } from "../dtos/product-data";
import { AppEvent } from "./event";
import { EventTypes } from "./event-types";

export class ProductCreatedEvent extends AppEvent {
    public readonly type = EventTypes.ProductCreated;

    constructor(
        public readonly data: ProductData
    ) {
        super()
    }
}