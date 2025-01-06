import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateGenreDto{
    @IsString()
    @IsOptional()

    @ApiProperty({
        description: 'The name of the genre',
        example: 'Action',
    })

    genre_name: string
}