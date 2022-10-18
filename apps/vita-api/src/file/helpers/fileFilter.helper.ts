export const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,

    callback: (error: Error, acceptFile: boolean) => void
) => {
    if (!file) {
        return callback(new Error('File is empty'), false)
    }

    const fileTypes = ['png', 'jpeg', 'jpg']

    if (!fileTypes.includes(file.mimetype.split('/')[1])) {
        return callback(new Error('Only image files are allowed!'), false)
    }

    callback(null, true)
}
