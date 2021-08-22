import { Controller, Get, Post,Body, Query } from '@nestjs/common';
import { campaignService } from '../campaign/campaign.service';


@Controller('marketing')
export class linkedinController{
    constructor(private readonly campaignService: campaignService){}

    @Post('campaign')
    async createCampaigns(@Body() campaigns:any): Promise<any>{
        const result = await this.campaignService.createCampaigns(campaigns)
        return result
    }

    @Get('campaigns')
    async getCampaigns(@Query('limit') limit?:number,@Query('page') page?:number):Promise<any>{
        let _limit,_skip
        if(!limit){
            _limit=10
        }
        else{
            _limit=limit
        }
        if(!page){
            _skip=0
        }
        else{
            _skip=_limit*page
        }
        console.log('hello',_limit)
        const result = await this.campaignService.getCampaigns(_limit,_skip)
        return result
    }
}