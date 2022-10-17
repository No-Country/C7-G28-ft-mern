import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileName, fileFilter } from './helpers'

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
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
