import { IsString, IsNumber } from "class-validator";

export class CreateRatingDto {
    @IsNumber()
    rating: number;

    @IsString()
    comment: string;
}   