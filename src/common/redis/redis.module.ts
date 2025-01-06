import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ExpressAdapter } from "@nestjs/platform-express";

@Module({
    providers: [RedisService]
})
export class RedisCustomModule { }