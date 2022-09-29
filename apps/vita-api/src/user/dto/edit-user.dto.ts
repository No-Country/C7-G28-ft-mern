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
}
