import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { register } from 'module';

export class CreateOtpDto {
    @ApiProperty({
        description: "Foydalanuvchining email manzili",
        example: "john.doe@example.com",
    })
    @IsEmail({}, { message: 'Email to\'g\'ri formatda bo\'lishi kerak' })
    email: string;
}

export class RegisterDto {
    @ApiProperty({
        description: "Foydalanuvchining email manzili",
        example: "john.doe@example.com",
    })
    @IsEmail({}, { message: 'Email to\'g\'ri formatda bo\'lishi kerak' })
    email: string;

    @ApiProperty({
        description: "Foydalanuvchining ismi",
        example: "John Doe",
    })
    @IsString()
    name: string;
}

export class CheckOtpDto {
    @ApiProperty({
        description: "Foydalanuvchiga yuborilgan OTP raqami",
        example: 123456,
    })
    @IsNotEmpty({ message: 'OTP to\'g\'ri kiritilishi kerak' })
    @IsNumber({}, { message: 'OTP raqami bo\'lishi kerak' })
    otp: number;

    @ApiProperty({
        description: "Foydalanuvchining ID raqami",
        example: "john.doe@example.com",
    })
    @IsEmail({}, { message: 'Email to\'g\'ri formatda bo\'lishi kerak' })
    @IsNotEmpty({ message: 'Foydalanuvchi ID to\'g\'ri kiritilishi kerak' })
    email: string;
}
