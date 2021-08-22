import { parse } from 'fast-csv';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { leadService } from 'src/leads/leads.service';


@Injectable()
export class csvService{
    constructor(private readonly leadService: leadService){}

    parseCsv(file:any,campaign:string){
        const constants =['firstName','LinkedInProfileUrl','lastName']
        let LeadData=[]
        let errors=[]

        const readableBuffer = new Readable({
            read(){
                this.push(file)
                this.push(null)
            }
        })
        return new Promise((resolve,reject)=>{
            readableBuffer.pipe(parse({ headers: true,ignoreEmpty:false }))
            .on('headers',headers=>{
                constants.map(header=>{
                if( !headers.includes(header)){
                        errors.push('invalid.headers')
                        return true
                }

                return true
                })
            })
            .on('data', async( row:any )=> {
                
                try {
                    LeadData.push({...row,linkedinProfileUrl:row.LinkedInProfileUrl})

                } catch (error) {
                    console.log(error)
                    return errors.push({details:error.details,row:error._original})
                }
            })
            .on('end',async (rowCount) =>{
                try {
                    const result  = await this.leadService.bulkCreateLeads(LeadData,campaign)
                    resolve(result)
                } 
                catch (error) {
                    console.log(error)
                
                }
            
            })
        })

    }
}