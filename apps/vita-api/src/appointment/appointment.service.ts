import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common'
import { StatusAppointment, User, Status } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllAppointments(doctorId: number) {
        try {
            let appointments = null

            if (doctorId > 0) {
                appointments = await this.prisma.appointment.findMany({
                    where: { doctorId, status: Status.ACTIVE },
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
            } else {
                appointments = await this.prisma.appointment.findMany({
                    where: { status: Status.ACTIVE },
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
            }

            return appointments
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async findOneAppointment(id: number) {
        const appointment = await this.prisma.appointment.findFirst({
            where: { id, status: Status.ACTIVE },
            select: {
                id: true,
                date: true,
                time: true,
                statusAppointment: true,
                doctorId: true,
                status: false
            }
        })

        if (!appointment) throw new BadRequestException('Appointment not found')

        return appointment
    }

    async updateAppointment(id: number, data: UpdateAppointmentDto) {
        try {
            const { date, time, statusAppointment = 'PENDING' } = data

            const appointment = await this.prisma.appointment.updateMany({
                where: { id, status: Status.ACTIVE },
                data: {
                    date,
                    time,
                    statusAppointment: StatusAppointment[statusAppointment]
                }
            })

            return appointment
        } catch (error) {
            this.handleExceptions(error)
        }
    }

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

    async deleteAppointment(id: number) {
        try {
            await this.prisma.appointment.updateMany({
                where: { id, status: Status.ACTIVE },
                data: { status: 'INACTIVE' }
            })
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    private handleExceptions(error: any): never {
        if (error.code === 'P2025')
            throw new BadRequestException(error.meta.cause)

        console.log(error)
        throw new InternalServerErrorException(`Please check logs`)
    }
}
