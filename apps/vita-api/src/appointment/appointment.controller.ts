import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post()
    @UseGuards(JwtGuard)
    create(@Body() data: CreateAppointmentDto, @GetUser() user: User) {
        return this.appointmentService.createAppointment(data, user)
    }
}
