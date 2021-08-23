import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { linkedinModule } from './linkedin/linkedin.module'; 
import { Connection } from 'typeorm';
import { config } from 'ormconfig';
import { csvModule } from './csv/csv.module';
import { ScheduleModule } from '@nestjs/schedule';
import { cronModule } from './cron/cron.module';
import { redisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [linkedinModule,TypeOrmModule.forRoot(config),csvModule,ScheduleModule.forRoot(),cronModule,redisModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
