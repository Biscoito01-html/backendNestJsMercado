
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("produtos")
export class ProdutoEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "CodeBar" })
    codeBar: string

    @Column({ name: "name" })
    name: string

    @Column({ name: "description" })
    description: string

    @Column('decimal', { precision: 10, scale: 2 })
    price: number

    @Column({ name: "quantity" })
    quantity: number

    @Column({ name: "peso" })
    peso: number

    @Column({ name: "unidadeMedida" })
    unidadeMedida: string

    @CreateDateColumn({ name: "createdAt" })
    created_at: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updated_at: Date;

}
