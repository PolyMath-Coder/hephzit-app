// import { ObjectId } from 'mongodb';
import {Entity, Column, ObjectId, ObjectIdColumn} from 'typeorm';

@Entity('user')
export class User {
    @ObjectIdColumn()
    id: ObjectId

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