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
import { User } from '@prisma/client'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Get(':id')
    @UseGuards(JwtGuard)
    findOne(@Param('id') id: string) {
        return this.appointmentService.findOneAppointment(+id)
    }

    @Patch(':id')
    @UseGuards(JwtGuard)
    update(@Param('id') id: string, @Body() data: UpdateAppointmentDto) {
        return this.appointmentService.updateAppointment(+id, data)
    }

    @Post()
    @UseGuards(JwtGuard)
    create(@Body() data: CreateAppointmentDto, @GetUser() user: User) {
        return this.appointmentService.createAppointment(data, user)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    delete(@Param('id') id: string) {
        return this.appointmentService.deleteAppointment(+id)
    }
}
