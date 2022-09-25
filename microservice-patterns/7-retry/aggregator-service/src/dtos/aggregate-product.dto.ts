import { ReviewDto } from "./get-reviews.dto";
import { PriceDto } from "./price.dto";

export interface AggregateProductDto {
    id: number;
    category: string;
    description: string;
    price: number;
    reviews: ReviewDto[];
}