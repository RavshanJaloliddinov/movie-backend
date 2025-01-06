import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    movie_id: string

    @IsString()
    @IsNotEmpty()
    comment: string
}