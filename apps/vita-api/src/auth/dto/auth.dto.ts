import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum Role {
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
    DOCTOR = 'DOCTOR',
    PATIENCE = 'PATIENCE'
}

export class AuthDtoSignUp {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsEnum(Role)
    role: string
}

export class AuthDtoSignIn {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
