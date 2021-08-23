import { Injectable, OnModuleInit } from "@nestjs/common";
import { redisPubSub } from "./redis.provider";
import Redis from 'ioredis'
import axios from "axios";
import { leadService } from "src/leads/leads.service";

@Injectable()
export class redisExpiredEvent implements OnModuleInit{
    redis = new Redis({
        host:'localhost',
        port:6379,
        db:0
    });
    constructor(
        private readonly redisPubSub:redisPubSub,
        private readonly leadService:leadService
    ){
        this.redis.on("ready", () => {
        this.redis.config("SET", "notify-keyspace-events", "Ex");
        });
    }
    async onModuleInit(){
        this.redisPubSub.subscribe("__keyevent@0__:expired");
        this.redisPubSub.on("message", async (channel:string, message:string)=>{
            const [type, key] = message.split(":")
            switch (type) {
                case "reminder": {
                  const value = await this.get(key)
                  console.log(value)
                  let data = JSON.parse(value)
                  try {
                    await this.remove(key)
                    const result = await axios.post(`${process.env.linkedInAutomationBaseUrl}/linkedin/invite/send`,{
                      receiverProfile:data.linkedinProfileUrl,
                      senderEmail:data.campaign.senderEmail,
                    })
          
                    if(result.data){
                      console.log(result.data)
                    }
          
                  } catch (error) {
                    console.log(error.response.data)
                    // const result = await queries.updateLeadStatus(data.id,'INVITE_FAILED')
                    // const response = await queries.updateinviteFailureLatestError(data.id,error.response.data.message)
                  }
                  console.log("TYPE: ", type);
                  console.log("KEY: ", key);
                  console.log("VALUE: ", JSON.parse(value));
                  break;
                  }
                }
        })
    }

    get(key:string):Promise<string> {
        return this.redis.get(key);
    }
    remove(key:string):Promise<number>{
        return this.redis.del(key)
    }
    setReminder(key:string, value:string, expire:number) {
        this.redis
            .multi()
            .set(key, value)
            .set(`reminder:${key}`, 1)
            .expire(`reminder:${key}`, expire)
            .exec();
    }
}