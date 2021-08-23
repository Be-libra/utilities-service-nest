import { Module } from "@nestjs/common";
import { leadModule } from "src/leads/lead.module";
import { redisPubSub } from "./redis.provider";
import { redisExpiredEvent } from "./redis.service";

@Module({
    imports:[leadModule],
    providers:[redisExpiredEvent,redisPubSub],
    exports:[redisExpiredEvent,redisPubSub]
})

export class redisModule{}