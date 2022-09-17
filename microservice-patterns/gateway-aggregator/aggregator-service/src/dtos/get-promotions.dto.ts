export type GetPromotionsDto = PromotionDto[];

export interface PromotionDto {
    id: number;
    type: string;
    discount: number;
    endDate: string;
    active: boolean;
}