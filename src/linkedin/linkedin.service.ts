import { Inject, Injectable } from "@nestjs/common";
import { Observable,from } from "rxjs";
import { campaignService } from "../campaign/campaign.service";
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class linkedinService{
    constructor(private readonly campaignService: campaignService){}

    async bulkCreate(_campaigns:any):Promise<any>{
        const response =await Promise.all( _campaigns.map((campaign:any)=>{
            return this.campaignService.createCampaigns({...campaign,id:uuidv4()})
        }));

        return response
    }
}