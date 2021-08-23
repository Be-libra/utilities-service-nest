import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { campaignService } from "src/campaign/campaign.service";
import { leadService } from "src/leads/leads.service";

@Injectable()
export class cronService{
    constructor(
        private readonly campaignService : campaignService,
        private readonly leadService : leadService
    ){}

    @Cron('02 24 * * * *')
    async handleCron(){
        const getRandomLimit = Math.round((Math.random()*5)+4)
        const campaigns = await this.campaignService.getCampaigns(100,0)
        const getTimes = this.randomTime(campaigns.length*getRandomLimit)
        const expiringSeconds = getTimes.map(time=>{
            return Math.round((new Date(time).getTime()-new Date().getTime())/10000)
        })
        let leads = []
        await Promise.all(campaigns.map(async(campaign)=>{
            const getLeads = await this.leadService.getLeads(getRandomLimit,campaign.id)
            leads = [...leads,...getLeads]
        }))

        console.log(leads)
        


    }

    randomTime(totalLeads:number): number[]{
        let timesForInvitation = []
        let randomNumber=[]
        let index=0
        while(index<totalLeads) {
            let Time = new Date()
            const generateRandomHour = Math.round((Math.random()*23)+1)
            Time = new Date(Time.getTime() + (1*generateRandomHour*3600*1000))
            if(!randomNumber.includes(generateRandomHour)){
                randomNumber.push(generateRandomHour)
                timesForInvitation.push(Time)
                index +=1
            }
        }
        return timesForInvitation
    }
}