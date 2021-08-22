import { Module } from '@nestjs/common';
import { campaignModule } from 'src/campaign/campaign.modules';
import { linkedinController } from './linkedin.controller';
import { linkedinService } from './linkedin.service';


@Module({
  imports: [campaignModule],
  controllers: [linkedinController],
  providers: [linkedinService],
})
export class linkedinModule {}
