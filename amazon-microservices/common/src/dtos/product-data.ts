import { CategoryData } from "./category-data";

export class ProductData {
    public constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly category: CategoryData,
    ) { }

    public static build(data: ProductData): ProductData {
        return new ProductData(
            data.id,
            data.name,
            data.description,
            data.price,
            data.category
        );
    }
}
