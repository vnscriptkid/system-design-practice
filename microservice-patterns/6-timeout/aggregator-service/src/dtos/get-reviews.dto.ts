export type GetReviewsDto = ReviewDto[];

export interface ReviewDto {
    id: number;
    user: string;
    rating: number;
    comment: string;
    productId: number;
}