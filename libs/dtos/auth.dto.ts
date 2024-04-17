import {IsString, IsEmail, IsNotEmpty, IsOptional} from 'class-validator'

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
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