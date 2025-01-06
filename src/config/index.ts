import * as dotenv from "dotenv"
import { Logger } from "@nestjs/common"


dotenv.config()

export type ConfigType = {
    PORT: number
    DB_URL: string
    GOOGLE_OAUTH_CLIENT_ID: string
    GOOGLE_OAUTH_CLIENT_SECRET: string
    JWT_SECRET: string
    EMAIL_PASSWORD: string
    EMAIL: string
    ACCESS_TOKEN_SECRET_KEY: string
    ACCESS_TOKEN_EXPIRE_TIME: string
    REFRESH_TOKEN_SECRET_KEY: string
    REFRESH_TOKEN_EXPIRE_TIME: string
}

const requiredVariables = [
    "PORT",
    "DB_URL",
    "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET",
    "JWT_SECRET",
    "EMAIL_PASSWORD",
    "EMAIL",
    "ACCESS_TOKEN_SECRET_KEY",
    "ACCESS_TOKEN_EXPIRE_TIME",
    "REFRESH_TOKEN_SECRET_KEY",
    "REFRESH_TOKEN_EXPIRE_TIME",
]

const missingVariables = requiredVariables.filter((variable) => {
    const value = process.env[variable];
    return !value || value.trim() === "";
});

if (missingVariables.length > 0) {
    Logger.error(`Missing or empty required environment variables: ${missingVariables.join(", ")}`);
    process.exit(1);
}

export const config: ConfigType = {
    PORT: parseInt(process.env.PORT as string, 10),
    DB_URL: process.env.DB_URL as string,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
    EMAIL: process.env.EMAIL as string,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY as string,
    ACCESS_TOKEN_EXPIRE_TIME: process.env.ACCESS_TOKEN_EXPIRE_TIME as string,
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY as string,
    REFRESH_TOKEN_EXPIRE_TIME: process.env.REFRESH_TOKEN_EXPIRE_TIME as string,
}