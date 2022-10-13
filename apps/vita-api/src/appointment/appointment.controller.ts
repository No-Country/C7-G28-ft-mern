import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Patch,
    Query,
    Param,
    Delete
} from '@nestjs/common'
import { Role, User } from '@prisma/client'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { RolesGuard } from '../auth/guard/roles.guard'
import { Roles } from '../auth/decorator/roles.decorator'

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Get(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR', 'PATIENT', 'ADMIN')
    findOne(@Param('id') id: string) {
        return this.appointmentService.findOneAppointment(+id)
    }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR', 'PATIENT')
    findAll(
        @Query('doctorId') doctorId: string,
        @Query('userId') userId: string
    ) {
        return this.appointmentService.findAllAppointments(+doctorId, +userId)
    }

    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR')
    update(@Param('id') id: string, @Body() data: UpdateAppointmentDto) {
        return this.appointmentService.updateAppointment(+id, data)
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR', 'PATIENT', 'ADMIN')
    create(@Body() data: CreateAppointmentDto, @GetUser() user: User) {
        return this.appointmentService.createAppointment(data, user)
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('ADMIN')
    delete(@Param('id') id: string) {
        return this.appointmentService.deleteAppointment(+id)
    }
}
