/* eslint-disable indent */
/* eslint-disable no-unused-vars */

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum Role {
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
    DOCTOR = 'DOCTOR',
    PATIENT = 'PATIENT'
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

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsString()
    state: string

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    zipCode: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    birthDate: string
}

export class AuthDtoSignIn {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
