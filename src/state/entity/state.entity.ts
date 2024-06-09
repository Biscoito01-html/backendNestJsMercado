import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('state')
export class StateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    abberviation: string;
}