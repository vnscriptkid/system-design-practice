import { Category } from "src/models/category.entity";
import { Product } from "src/models/product.entity";

export const productsProviders = [
    {
        provide: 'PRODUCTS_REPOSITORY',
        useValue: Product,
    },
];

export const categoriesProviders = [
    {
        provide: 'CATEGORIES_REPOSITORY',
        useValue: Category,
    },
];