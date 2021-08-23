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

@Module({
  imports: [linkedinModule,TypeOrmModule.forRoot(config),csvModule,ScheduleModule.forRoot(),cronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
