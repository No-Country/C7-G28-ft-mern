import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common'
import { DiagnosticService } from './diagnostic.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'

@Controller('diagnostic')
export class DiagnosticController {
    constructor(private readonly diagnosticService: DiagnosticService) {}

    @Post()
    create(@Body() data: CreateDiagnosticDto) {
        return this.diagnosticService.create(data)
    }

    @Get()
    findAll() {
        return this.diagnosticService.findAllDiagnostics()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.diagnosticService.findOneDiagnostic(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateDiagnosticDto) {
        return this.diagnosticService.updateDiagnostic(+id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.diagnosticService.deleteDiagnostic(+id)
    }
}
