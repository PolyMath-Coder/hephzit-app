import { OrderTypeEnum } from "libs/enums/enums";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";



@Entity('order')
export class Order {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    userId: ObjectId

    @Column()
    pair: string

    @Column()
    type: string

    @Column()
    amount: number

    @Column()
    price: number
}