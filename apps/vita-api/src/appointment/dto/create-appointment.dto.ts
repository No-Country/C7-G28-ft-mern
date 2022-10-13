import { ApiProperty } from '@nestjs/swagger'
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString
} from 'class-validator'

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

enum StatusAppointment {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    CANCELED = 'CANCELED'
}
export class CreateAppointmentDto {
    @ApiProperty({ required: true, type: Number })
    @IsNumber()
    @IsPositive()
    doctorId: number

    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    @IsString()
    date: string

    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    @IsString()
    time: string

    @ApiProperty({ required: false, type: String })
    @IsEnum(StatusAppointment)
    @IsOptional()
    statusAppointment?: string

    @ApiProperty({ required: false, type: String })
    @IsEnum(Status)
    @IsOptional()
    status?: string
}
