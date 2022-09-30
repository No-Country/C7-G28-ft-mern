/* eslint-disable indent */

import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { Role } from 'src/auth/dto'

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    @IsString()
    firstName?: string

    @IsOptional()
    @IsString()
    lastName?: string

    @IsOptional()
    @IsEnum(Role)
    role?: string

    @IsOptional()
    @IsString()
    birthDate?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsString()
    city?: string

    @IsOptional()
    @IsString()
    state?: string

    @IsOptional()
    @IsString()
    country?: string

    @IsOptional()
    @IsString()
    zipCode?: string
}
