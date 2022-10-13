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

    async findAllAppointments(doctorId: number, userId: number) {
        if (doctorId === userId)
            throw new BadRequestException(
                'doctor id and user id cannot be the same'
            )

        try {
            let appointments = null

            if (doctorId > 0 && userId > 0) {
                appointments = await this.prisma.appointment.findMany({
                    where: { doctorId, userId, status: Status.ACTIVE },
                    select: this.selectQueryParameters()
                })
            }

            if (doctorId > 0 && !appointments) {
                appointments = await this.prisma.appointment.findMany({
                    where: { doctorId, status: Status.ACTIVE },
                    select: this.selectQueryParameters()
                })
            }

            if (userId > 0 && !appointments) {
                appointments = await this.prisma.appointment.findMany({
                    where: { userId, status: Status.ACTIVE },
                    select: this.selectQueryParameters()
                })
            }

            if (!appointments) {
                appointments = await this.prisma.appointment.findMany({
                    where: { status: Status.ACTIVE },
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

        if (user.role === 'PATIENT') {
            appointment = await this.prisma.appointment.findFirst({
                where: { id, userId: user.id, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })
        }

        if (user.role === 'DOCTOR') {
            appointment = await this.prisma.appointment.findFirst({
                where: { id, doctorId: user.id, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })
        }

        if (user.role === 'ADMIN') {
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
            const { date, time, statusAppointment = 'PENDING' } = data

            let appointment = null

            const appointmentDB = await this.prisma.appointment.findFirst({
                where: { date, doctorId: user.id, time, status: Status.ACTIVE },
                select: this.selectQueryParameters()
            })

            if (appointmentDB)
                throw new BadRequestException('Appointment already exists')

            if (user.role === 'DOCTOR') {
                appointment = await this.prisma.appointment.updateMany({
                    where: { id, doctorId: user.id, status: Status.ACTIVE },
                    data: {
                        date,
                        time,
                        statusAppointment: StatusAppointment[statusAppointment]
                    }
                })
            }

            if (user.role === 'ADMIN') {
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
            where: { id: doctorId, role: 'DOCTOR' }
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
                    statusAppointment: 'PENDING',
                    status: 'ACTIVE'
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
            if (user.role === 'DOCTOR') {
                await this.prisma.appointment.updateMany({
                    where: { id, doctorId: user.id, status: Status.ACTIVE },
                    data: { status: Status.INACTIVE }
                })
            }

            if (user.role === 'ADMIN') {
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
