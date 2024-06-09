import { CartEntity } from "src/cart/entities/cart.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'phone' })
    phone: string;

    @Column({ name: 'cpf', nullable: false })
    cpf: string;

    @Column({ name: 'address', nullable: false })
    address: string;

    @Column({ name: 'city', nullable: false })
    city: string;

    @Column({ name: 'state', nullable: false })
    state: string;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({ name: 'birthdate', nullable: false })
    birthdate: string;

    @Column({ name: 'status', nullable: false })
    status: boolean;


    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}