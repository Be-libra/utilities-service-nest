import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from 'src/campaign/campaign.entity';
import { campaignModule } from 'src/campaign/campaign.modules';
import { Lead } from './leads.entity';
import { leadService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead]),campaignModule],
  providers: [leadService],
  exports:[leadService]
})
export class leadModule {}