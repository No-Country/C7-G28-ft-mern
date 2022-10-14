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
    @Roles(Role.DOCTOR, Role.PATIENT, Role.ADMIN)
    findOne(@Param('id') id: string, @GetUser() user: User) {
        return this.appointmentService.findOneAppointment(+id, user)
    }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR, Role.PATIENT, Role.ADMIN)
    findAll(
        @Query('doctorId') doctorId: string,
        @Query('userId') userId: string,
        @GetUser() user: User
    ) {
        return this.appointmentService.findAllAppointments(
            +doctorId,
            +userId,
            user
        )
    }

    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR, Role.ADMIN)
    update(
        @Param('id') id: string,
        @Body() data: UpdateAppointmentDto,
        @GetUser() user: User
    ) {
        return this.appointmentService.updateAppointment(+id, data, user)
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR, Role.PATIENT, Role.ADMIN)
    create(@Body() data: CreateAppointmentDto, @GetUser() user: User) {
        return this.appointmentService.createAppointment(data, user)
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.PATIENT, Role.DOCTOR)
    delete(@Param('id') id: string, @GetUser() user: User) {
        return this.appointmentService.deleteAppointment(+id, user)
    }
}
