import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class FileService {
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
}
