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

export class CreateDiagnosticDto {
    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({ required: true, type: String })
    @IsNotEmpty()
    @IsString()
    appointmentId: number

    @ApiProperty({ required: false, type: Object })
    files?: any

    @ApiProperty({ required: false, type: String })
    @IsEnum(Status)
    @IsOptional()
    status?: string
}
