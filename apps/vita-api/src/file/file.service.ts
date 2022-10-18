import { Injectable, InternalServerErrorException } from '@nestjs/common'
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

    async uploadingImgsPathDB(
        files: Express.Multer.File[],
        diagnosticId: number
    ) {
        const { urls } = await this.uploadImagesToCloudinary(files)

        const urlsPromise = urls.map(async url => {
            return await this.prisma.img.create({
                data: {
                    url,
                    status: Status.ACTIVE
                },
                select: {
                    id: true
                }
            })
        })

        const urlsById = await Promise.all(urlsPromise)

        await this.prisma.diagnosticInImg.createMany({
            data: urlsById.map(url => ({
                diagnosticId,
                imgId: url.id,
                status: Status.ACTIVE
            }))
        })

        return { urls }
    }

    async updateUrlDB(files: Express.Multer.File[], imgsIds: { id: number }[]) {
        const { urls } = await this.uploadImagesToCloudinary(files)

        if (urls.length > imgsIds.length) {
            throw new InternalServerErrorException(
                'The number of images does not match'
            )
        }

        const imgsPromise = await urls.map(async (url, index) => {
            return await this.prisma.img.updateMany({
                where: { id: imgsIds[index].id, status: Status.ACTIVE },
                data: { url: url }
            })
        })

        await Promise.all(imgsPromise)
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
