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

export class CreateDiagnosticDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNumber()
    @IsPositive()
    appointmentId: number

    @IsEnum(Status)
    @IsOptional()
    status?: string
}
