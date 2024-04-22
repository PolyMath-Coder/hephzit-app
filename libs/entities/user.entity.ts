import { ObjectId } from 'mongodb';
import {Entity, Column, ObjectIdColumn, PrimaryColumn} from 'typeorm';

@Entity('user')
export class User {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    walletBalance: number

    @Column()
    password: string
}