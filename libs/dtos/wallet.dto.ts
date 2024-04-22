import {IsString, IsEmail, IsNumber, IsEnum, IsNotEmpty, IsOptional} from 'class-validator'
import { TransactionTypeEnum } from 'libs/enums/enums'

export class InAppWalletTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsOptional()
    transaction_type?: TransactionTypeEnum
}

export class WalletTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    transaction_type?: TransactionTypeEnum
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