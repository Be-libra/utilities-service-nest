import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { Lead, Status } from "./leads.entity";
import {v4 as uuidv4} from 'uuid'
import { campaignService } from "src/campaign/campaign.service";

@Injectable()
export class leadService{
    constructor(
        @InjectRepository(Lead)
        private readonly leadRepo:Repository<Lead>,
        private readonly campaignService:campaignService
    ){}

    async bulkCreateLeads(_data:any,campaignId:string) : Promise<Lead[]>{

        const getCampaign = await this.campaignService.getCampaign(campaignId)

        let data = _data.map(lead=>{
            delete lead.LinkedInProfileUrl
            return({...lead,id:uuidv4(),campaign:getCampaign})
        })
        
        return await this.leadRepo.save(data)
    }

    async getLeads(limit:number,campaignId:string): Promise<Lead[]>{
        return (this.leadRepo.find({where:{campaignId,status:Status.initial},take:limit,relations:['campaign']}))
    }

    async updateLeadStatus(status:Status,leadId:string,message?:string):Promise<Lead>{
        const lead = await this.leadRepo.findOne({where:{id:leadId}})
        lead.status = status
        if(message){
            lead.inviteFailureLatestError=message
            return await this.leadRepo.save(lead)
        }

        return await this.leadRepo.save(lead)

    }
}