import { IsOptional, IsString } from "class-validator";

export class UpdateReviewDto {
    @IsString()
    @IsOptional()
    user_id!: string

    @IsString()
    @IsOptional()
    movie_id!: string

    @IsString()
    @IsOptional()
    comment!: string
}