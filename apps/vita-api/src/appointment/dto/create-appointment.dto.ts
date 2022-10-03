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
    @IsNumber()
    @IsPositive()
    doctorId: number

    @IsNotEmpty()
    @IsString()
    date: string

    @IsNotEmpty()
    @IsString()
    time: string

    @IsEnum(StatusAppointment)
    @IsOptional()
    statusAppointment?: string

    @IsEnum(Status)
    @IsOptional()
    status?: string
}
