import {IsString, IsEmail, IsNumber, IsEnum, IsNotEmpty, IsOptional} from 'class-validator'
import { TransactionTypeEnum } from 'libs/enums/enums'

export class WalletTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    transaction_type: TransactionTypeEnum
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}