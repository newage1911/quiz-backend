import { ChoiceEnum } from 'src/models/data.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 8 })
    uid: string;

    @Column({ nullable: true })
    team: string;

    @Column()
    node: number;

    @Column()
    quiz: number;

    @Column({
        type:'enum',
        enum:ChoiceEnum,
        nullable:false
    })
    choice: string;

    @Column({default: false})
    is_correct: boolean;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }) 
    timestamp: Date;
}
