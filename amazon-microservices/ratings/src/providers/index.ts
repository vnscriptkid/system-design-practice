import { ProductRating } from "src/models/product-ratings";
import { Product } from "src/models/product.entity";

export const productsProviders = [
    {
        provide: 'PRODUCTS_REPOSITORY',
        useValue: Product,
    },
];

export const productRatingsProviders = [
    {
        provide: 'PRODUCT_RATINGS_REPOSITORY',
        useValue: ProductRating,
    },
];