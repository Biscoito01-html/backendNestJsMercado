import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class CityEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;
}