import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common'
import { StatusAppointment, User, Status, Role } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllAppointments(doctorId: number, userId: number, user: User) {
        if (doctorId === userId)
            throw new BadRequestException(
                `doctor id ${doctorId} and user id ${userId} cannot be the same`
            )

        try {
            let appointments = null

            if (
                (doctorId > 0 && user.role === Role.ADMIN) ||
                (userId > 0 && user.role === Role.ADMIN)
            ) {
                appointments = await this.prisma.appointment.findMany({
                    where: { doctorId, userId, status: Status.ACTIVE },
                    select: this.selectQueryParameters()
                })
            }

            if (doctorId > 0 && !appointments && user.role === Role.PATIENT) {
                appointments = await this.prisma.appointment.findMany({
                    where: { doctorId, userId: user.id, status: Status.ACTIVE },
                    select: this.selectQueryParameters()
                })
            }

            if (userId > 0 && !appointments && user.role === Role.DOCTOR) {
                appointments = await this.prisma.appointment.findMany({
                    where: { userId, doctorId: user.id, status: Status.ACTIVE },
                    select: this.selectQueryParameters()
                })
            }

            return appointments
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async findOneAppointment(id: number, user: User) {
        let appointment = null

        if (user.role === Role.PATIENT) {
            appointment = await this.prisma.appointment.findFirst({
                where: { id, userId: user.id, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })
        }

        if (user.role === Role.DOCTOR) {
            appointment = await this.prisma.appointment.findFirst({
                where: { id, doctorId: user.id, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })
        }

        if (user.role === Role.ADMIN) {
            appointment = await this.prisma.appointment.findFirst({
                where: { id, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })
        }

        if (!appointment) throw new BadRequestException('Appointment not found')

        return appointment
    }

    async updateAppointment(
        id: number,
        data: UpdateAppointmentDto,
        user: User
    ) {
        try {
            const {
                date,
                time,
                statusAppointment = StatusAppointment.PENDING
            } = data

            let appointment = null

            const appointmentDB = await this.prisma.appointment.findFirst({
                where: { date, doctorId: user.id, time, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })

            if (appointmentDB)
                throw new BadRequestException('Appointment already exists')

            if (user.role === Role.DOCTOR) {
                appointment = await this.prisma.appointment.updateMany({
                    where: { id, doctorId: user.id, status: Status.ACTIVE },
                    data: {
                        date,
                        time,
                        statusAppointment: StatusAppointment[statusAppointment]
                    }
                })
            }

            if (user.role === Role.ADMIN) {
                appointment = await this.prisma.appointment.updateMany({
                    where: { id, status: Status.ACTIVE },
                    data: {
                        date,
                        time,
                        statusAppointment: StatusAppointment[statusAppointment]
                    }
                })
            }

            if (!appointment || appointment.count === 0)
                throw new BadRequestException('Appointment not found')

            return { ...data, ...appointment }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async createAppointment(data: CreateAppointmentDto, user: User) {
        const { date, doctorId, time } = data

        if (doctorId === user.id)
            throw new BadRequestException(
                `doctor id ${doctorId} and user id ${user.id} cannot be the same`
            )

        const doctorDB = await this.prisma.user.findFirst({
            where: { id: doctorId, role: Role.DOCTOR }
        })

        if (!doctorDB) throw new BadRequestException('Doctor not found')

        const appointmentDB = await this.prisma.appointment.findFirst({
            where: { date, doctorId, time, status: Status.ACTIVE },
            select: this.selectQueryParameters()
        })

        if (appointmentDB)
            throw new BadRequestException('Appointment already exists')

        try {
            const appointment = await this.prisma.appointment.create({
                data: {
                    date,
                    time,
                    doctorId,
                    userId: user.id,
                    statusAppointment: StatusAppointment.PENDING,
                    status: Status.ACTIVE
                },
                select: this.selectQueryParameters()
            })

            return appointment
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async deleteAppointment(id: number, user: User) {
        try {
            if (user.role === Role.DOCTOR) {
                await this.prisma.appointment.updateMany({
                    where: { id, doctorId: user.id, status: Status.ACTIVE },
                    data: { status: Status.INACTIVE }
                })
            }

            if (user.role === Role.ADMIN) {
                await this.prisma.appointment.updateMany({
                    where: { id, status: Status.ACTIVE },
                    data: { status: Status.INACTIVE }
                })
            }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    private selectQueryParameters = () => {
        return {
            id: true,
            date: true,
            time: true,
            statusAppointment: true,
            doctorId: true,
            userId: true,
            status: false
        }
    }

    private handleExceptions(error: any): never {
        if (error.code === 'P2025')
            throw new BadRequestException(error.meta.cause)

        console.log(error)
        throw new InternalServerErrorException(`Please check logs`)
    }
}
