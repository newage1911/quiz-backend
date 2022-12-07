import { ChoiceEnum } from 'src/models/data.model';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Answer {

    @PrimaryColumn()
    id: number;

    @Column({
        type:'enum',
        enum:ChoiceEnum,
        nullable:false
    })
    choice: string;
}
