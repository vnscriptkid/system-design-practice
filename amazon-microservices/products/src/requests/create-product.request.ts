import { IsUUID, IsString, IsNumber } from "class-validator";

export class CreateProductRequest {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsUUID()
    category_id: string;
}   