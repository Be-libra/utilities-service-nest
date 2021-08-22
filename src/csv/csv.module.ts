import { Module } from "@nestjs/common";
import { leadModule } from "../leads/lead.module";
import { csvController } from "./csv.controller";
import { csvService } from "./csv.service";

@Module({
    imports:[leadModule],
    controllers:[csvController],
    providers:[csvService]
})

export class csvModule{}