import { Module } from '@nestjs/common';
import { campaignModule } from 'src/campaign/campaign.modules';
import { leadModule } from 'src/leads/lead.module';
import { redisModule } from 'src/redis/redis.module';
import { cronService } from './cron.service';

@Module({
  imports:[campaignModule,leadModule,redisModule],
  providers: [cronService],
})
export class cronModule {}