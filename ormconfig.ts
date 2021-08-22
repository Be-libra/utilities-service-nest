import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Campaign } from "src/campaign/campaign.entity"
import { Lead } from "src/leads/leads.entity"

export const config: TypeOrmModuleOptions={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'hello',
    database: 'testutilities',
    entities:[Campaign,Lead],
    migrations: ['src/migration/*{.ts,.js}','dist/migration/*/{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migration'
    },
    synchronize: true,
  }