import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { from,Observable } from 'rxjs';
import {v4 as uuidv4} from 'uuid'
import { Status } from '../leads/leads.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class campaignService{
    constructor(
        @InjectRepository(Campaign)
        private campaignRepo : Repository<Campaign>
    ){}

    createCampaigns(_data:any) : Observable<Campaign[]>{
        let data = _data.campaigns.map(campaign=>{
            return({...campaign,id:uuidv4()})
        })
        return from(this.campaignRepo.save(data))
    }

    getCampaignsLead(limit:number) : Observable<any>{
        return from(this.campaignRepo.find({relations:['leads'],
        where:{
            leads:{
                status:Status.initial,
            }
        },
        take:limit
    }))
    }

    getCampaigns(limit:number,offset:number) :Observable<Campaign[]>{
        return from(this.campaignRepo.find({take:limit,skip:offset}))
    }

    async getCampaign(campaignId) :Promise<Campaign> {
        const campaign = await this.campaignRepo.findOne({
            where:{
                id:campaignId
            }
        })
        return campaign
    }
}