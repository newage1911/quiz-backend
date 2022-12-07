import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn()
    uid: string;

    @Column()
    label: string;
}
