import {
    Controller,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileName, fileFilter } from './helpers'
import { RolesGuard, JwtGuard } from '../auth/guard'
import { Role } from '@prisma/client'
import { Roles } from '../auth/decorator/roles.decorator'

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.DOCTOR)
    @UseInterceptors(
        FilesInterceptor('files', 3, {
            fileFilter,
            storage: diskStorage({ filename: fileName })
        })
    )
    uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        return this.fileService.uploadImagesToCloudinary(files)
    }
}