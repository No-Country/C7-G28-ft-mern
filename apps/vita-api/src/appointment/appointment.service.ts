import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentService {
    constructor(private readonly prisma: PrismaService) {}

    async createAppointment(data: CreateAppointmentDto, user: User) {
        try {
            const { date, doctorId, time } = data

            const appointment = await this.prisma.appointment.create({
                data: {
                    date,
                    time,
                    doctorId,
                    userId: user.id,
                    statusAppointment: 'PENDING',
                    status: 'ACTIVE'
                },
                select: {
                    id: true,
                    date: true,
                    time: true,
                    statusAppointment: true,
                    doctorId: true,
                    userId: true,
                    status: false
                }
            })

            return appointment
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    private handleExceptions(error: any): never {
        console.log(error)
        throw new InternalServerErrorException(`Please check logs`)
    }
}
