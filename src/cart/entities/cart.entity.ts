
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "userID" })
    userId: number

    @Column({ name: "price" })
    price: number

    @Column({ name: "status" })
    status: string

    @Column({ name: "quantity" })
    quantity: number

    @Column('json')
    product: { id: number, quantity: number, price: number, name: string, }[]

    @CreateDateColumn({ name: "created_at" })
    created_at: Date
}
