/* eslint-disable indent */
/* eslint-disable no-unused-vars */

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum Role {
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
    DOCTOR = 'DOCTOR',
    PATIENT = 'PATIENT'
}

export class AuthDtoSignUp {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    firstName: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    lastName: string

    @ApiProperty({ required: true, enum: [Role] })
    @IsEnum(Role)
    role: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    country: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    state: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    zipCode: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    birthDate: string
}

export class AuthDtoSignIn {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string
}
