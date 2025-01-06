import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateActorDto{
    @ApiProperty({
        type: String,
        description: "Actor's full name",
        example: 'Colin Morgan'
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        type: String,
        example: 'age: 58, experience: 29 years'
    })
    @IsString()
    @IsNotEmpty()
    biography: string
}