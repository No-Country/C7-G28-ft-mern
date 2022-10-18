import { Injectable } from '@nestjs/common'
import { Status } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class FileService {
    constructor(private readonly prisma: PrismaService) {}

    async uploadImagesToCloudinary(files: Express.Multer.File[]) {
        const imgs = files.map(async file => {
            return await this.saveFile(file)
        })

        const imgsUrl = await Promise.all(imgs)

        return { urls: imgsUrl }
    }

    private async saveFile(file: Express.Multer.File): Promise<string> {
        const { secure_url: secureUrl } = await cloudinary.uploader.upload(
            file.path,
            { folder: 'test' }
        )
        return secureUrl
    }

    async disableDiagnosticImgs(
        diagnosticId: number,
        imgsIds: { id: number }[]
    ) {
        await this.prisma.diagnosticInImg.updateMany({
            where: { diagnosticId },
            data: { status: Status.INACTIVE }
        })

        const imgsPromise = imgsIds.map(async img => {
            return await this.prisma.img.updateMany({
                where: { id: img.id, status: Status.ACTIVE },
                data: { status: Status.INACTIVE }
            })
        })

        await Promise.all(imgsPromise)
    }
}
