import { IsUUID, IsString, IsNumber } from "class-validator";

export class RateProductRequest {
    @IsUUID()
    product_id: string;

    @IsNumber()
    rating: number;

    @IsString()
    comment: string;

    constructor(attrs: RateProductRequest) {
        Object.assign(this, attrs);
    }

    static build(attrs: RateProductRequest) {
        return new RateProductRequest(attrs);
    }
}   