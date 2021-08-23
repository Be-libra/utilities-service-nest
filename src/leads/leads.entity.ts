import { Campaign } from '../campaign/campaign.entity';
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

export enum Status{
    initial='INITIAL',
    forwarded='FORWARDED',
    success = 'INVITE_SUCCESS',
    failure = 'INVITE_FAILURE'

}

@Entity()
export class Lead {
    @PrimaryColumn()
    id: string;
  
    @Column({ length: 500 })
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    linkedinProfileUrl: string;

    @Column({default:Status.initial})
    status: Status;

    @Column({default:null})
    inviteFailureLatestError:string;

    @Column()
    campaignId:string

    @ManyToOne(()=>Campaign,campaign=>campaign.leads)
    campaign:Campaign;

    
}