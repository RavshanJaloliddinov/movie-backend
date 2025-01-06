import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The name of the genre',
        example: 'Action',
    })
    genre_name!: string;
}
