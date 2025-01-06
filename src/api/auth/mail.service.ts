import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as nodemailer from "nodemailer";
import { UserRoles } from "src/common/database/Enums";
import { config } from "src/config";
import { UserEntity } from "src/core/entity/user.entity";
import { UserRepository } from "src/core/repository/user.repository";
import { RedisService } from "../../common/redis/redis.service";

@Injectable()
export class MailService {
    private transporter;

    constructor(
        private redisService: RedisService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity) private usersRepository: UserRepository
    ) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_PASSWORD,
            },
        });
    }

    async sendOtp(email: string, otp: number) {
        const mailOptions = {
            from: config.EMAIL,
            to: email,
            subject: "Sizning OTP kodingiz",
            text: `Sizning bir martalik OTP kodingiz: ${otp}`,
        };

        await this.transporter.sendMail(mailOptions);
    }

    async generateJwt(email: string, role: UserRoles) {
        const accessToken = this.jwtService.sign(
            { email, role },
            {
                expiresIn: config.ACCESS_TOKEN_EXPIRE_TIME,
                secret: config.ACCESS_TOKEN_SECRET_KEY
            }
        );

        await this.redisService.setValue({
            key: `accessToken`,
            value: accessToken,
            expireTime: Number(config.ACCESS_TOKEN_EXPIRE_TIME),
        });

        const refreshToken = this.jwtService.sign(
            { email, role },
            { 
                expiresIn: config.REFRESH_TOKEN_EXPIRE_TIME,
                secret: config.REFRESH_TOKEN_SECRET_KEY
            }
        );

        await this.redisService.setValue({
            key: `refreshToken`,
            value: refreshToken,
            expireTime: Number(config.REFRESH_TOKEN_EXPIRE_TIME),
        });
        return { accessToken, refreshToken }
    }
}
