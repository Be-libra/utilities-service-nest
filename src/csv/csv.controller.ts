import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Express } from 'express';
import { csvService } from './csv.service';

  @Controller('linkedin/invite')
  export class csvController{
      constructor(
          private readonly csvService: csvService
      ){}

    @UseInterceptors(FileInterceptor('records'))
    @Post('bulk')
    uploadFile(
        @Body() body: any,
        @UploadedFile() records: Express.Multer.File,
    ) {

        const result = this.csvService.parseCsv(records.buffer,body.campaign)
        return result
    }
  }