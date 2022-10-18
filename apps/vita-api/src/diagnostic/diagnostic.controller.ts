import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common'
import { RolesGuard } from '../auth/guard/roles.guard'
import { JwtGuard } from '../auth/guard'
import { DiagnosticService } from './diagnostic.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'
import { Roles } from '../auth/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileName, fileFilter } from '../file/helpers'

@Controller('diagnostics')
export class DiagnosticController {
    constructor(private readonly diagnosticService: DiagnosticService) {}

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR)
    @UseInterceptors(
        FilesInterceptor('files', 3, {
            fileFilter,
            storage: diskStorage({ filename: fileName })
        })
    )
    create(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() data: CreateDiagnosticDto
    ) {
        return this.diagnosticService.create(data, (files = []))
    }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.PATIENT, Role.DOCTOR)
    findAll() {
        return this.diagnosticService.findAllDiagnostics()
    }

    @Get(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.PATIENT, Role.DOCTOR)
    findOne(@Param('id') id: string) {
        return this.diagnosticService.findOneDiagnostic(+id)
    }

    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR)
    @UseInterceptors(
        FilesInterceptor('files', 3, {
            fileFilter,
            storage: diskStorage({ filename: fileName })
        })
    )
    update(
        @Param('id') id: string,
        @Body() data: UpdateDiagnosticDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.diagnosticService.updateDiagnostic(+id, data, (files = []))
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR)
    remove(@Param('id') id: string) {
        return this.diagnosticService.deleteDiagnostic(+id)
    }
}
