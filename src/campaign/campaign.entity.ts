import { Lead } from '../leads/leads.entity';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Campaign {
    @PrimaryColumn()
    id: string;
  
    @Column({ length: 500 })
    title: string;
  
    @Column()
    senderEmail: string;
  
    @Column()
    personalNote: string;

    @OneToMany(()=>Lead,lead=>lead.campaign)
    leads:Lead[];
}