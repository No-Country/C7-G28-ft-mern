import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common'
import { RolesGuard } from '../auth/guard/roles.guard'
import { JwtGuard } from '../auth/guard'
import { DiagnosticService } from './diagnostic.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'
import { Roles } from '../auth/decorator/roles.decorator'

@Controller('diagnostic')
export class DiagnosticController {
    constructor(private readonly diagnosticService: DiagnosticService) {}

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR')
    create(@Body() data: CreateDiagnosticDto) {
        return this.diagnosticService.create(data)
    }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR')
    findAll() {
        return this.diagnosticService.findAllDiagnostics()
    }

    @Get(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR', 'PATIENT')
    findOne(@Param('id') id: string) {
        return this.diagnosticService.findOneDiagnostic(+id)
    }

    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR')
    update(@Param('id') id: string, @Body() data: UpdateDiagnosticDto) {
        return this.diagnosticService.updateDiagnostic(+id, data)
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('DOCTOR')
    remove(@Param('id') id: string) {
        return this.diagnosticService.deleteDiagnostic(+id)
    }
}
