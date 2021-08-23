import { Injectable } from "@nestjs/common";
import Redis from "ioredis";


export type redisClient = Redis.Redis

export const subscriber = new Redis({
    host:'localhost',
    port: 6379,
    db:0
});
export const publisher = new Redis({
    host:'localhost',
    port: 6379,
    db:0
});

@Injectable()
export class redisPubSub{
    constructor(){}

    publish(channel:string, message:string) {
        publisher.publish(channel, message);
    }
    subscribe(channel:string) {
        subscriber.subscribe(channel);
    }
    on(event:string, callback:Function) {
        subscriber.on(event, (channel, message) => {
        callback(channel, message);
    });
    }

}