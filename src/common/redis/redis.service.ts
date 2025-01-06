import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async getValue(key: string): Promise<any> {
        return this.redis.get(key); // Qaytarish bayonotini soddalashtirish
    }

    async setValue({
        key,
        value,
        expireTime,
    }: {
        key: string;
        value: any;
        expireTime?: number;
    }): Promise<string> { // Qaytish turini aniq ko'rsatish
        return expireTime
            ? this.redis.setex(key, expireTime, value) // To'g'ridan-to'g'ri soddalashtirish
            : this.redis.set(key, value);
    }

    async deleteValue(key: string): Promise<number> { // Qaytish turini ko'rsatish
        return this.redis.del(key);
    }
}
