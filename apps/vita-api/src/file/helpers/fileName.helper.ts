import { v4 as UUID } from 'uuid'

export const fileName = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error, filename: string) => void
): void => {
    if (!file) {
        return callback(new Error('File is empty'), '')
    }

    const fileExtension = file.mimetype.split('/')[1]

    const fileName = `${UUID()}.${fileExtension}`

    callback(null, fileName)
}
