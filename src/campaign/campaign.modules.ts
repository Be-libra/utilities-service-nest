import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignService } from './campaign.service';
import { Campaign } from './campaign.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [campaignService],
  exports:[campaignService]
})
export class campaignModule {}