import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY } from './constants'

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: (): void => {
        return cloudinary.config(process.env.CLOUDINARY_URL || '')
    }
}
