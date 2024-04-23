import { Timestamp } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity('transaction')
export class Transaction {
    @ObjectIdColumn()
    _id:  ObjectId

    @Column()
    userId: ObjectId

    @Column()
    transaction_type: string

    @Column()
    description: string

    @Column()
    amount: number

    @CreateDateColumn()
    createdAt: Timestamp
}