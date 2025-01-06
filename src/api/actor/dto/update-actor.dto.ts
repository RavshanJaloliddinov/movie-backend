import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateActorDto{
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    biography: string
}