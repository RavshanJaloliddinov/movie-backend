import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovieDto {

    @IsOptional()
    @IsString()
    video: string

    @IsOptional()
    @IsNumber()
    rating: number

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsDate()
    release_date: Date

    @IsOptional()
    @IsBoolean()
    is_premium:boolean

}