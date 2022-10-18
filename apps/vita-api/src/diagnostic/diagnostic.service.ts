import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common'
import { Status } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'
import { FileService } from '../file/file.service'

@Injectable()
export class DiagnosticService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileService: FileService
    ) {}

    async create(data: CreateDiagnosticDto, files: Express.Multer.File[]) {
        try {
            const { name, appointmentId, description } = data

            const appointmentDB = await this.prisma.appointment.findFirst({
                where: { id: Number(appointmentId), status: Status.ACTIVE }
            })

            if (!appointmentDB) {
                throw new BadRequestException(
                    `Appointment by id ${appointmentId} not found`
                )
            }

            const diagnostic = await this.prisma.diagnostic.create({
                data: {
                    name,
                    appointmentId: Number(appointmentId),
                    description,
                    status: 'ACTIVE'
                },
                select: this.selectQueryParameters()
            })

            let urls

            if (files.length > 0) {
                urls = await this.fileService.uploadingImgsPathDB(
                    files,
                    diagnostic.id
                )
            }

            return { ...diagnostic, ...urls }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    findAllDiagnostics() {
        try {
            const diagnostics = this.prisma.diagnostic.findMany({
                where: { status: Status.ACTIVE },
                select: {
                    diagnosticInImgs: {
                        where: { status: Status.ACTIVE },
                        select: {
                            Img: {
                                select: {
                                    status: false,
                                    url: true,
                                    id: true
                                }
                            },
                            id: false,
                            diagnosticId: false,
                            imgId: false,
                            status: false
                        }
                    },
                    ...this.selectQueryParameters()
                }
            })

            return diagnostics
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async findOneDiagnostic(id: number) {
        const diagnostic = await this.prisma.diagnostic.findFirst({
            where: { id, status: Status.ACTIVE },
            select: {
                diagnosticInImgs: {
                    where: { status: Status.ACTIVE },
                    select: {
                        Img: {
                            select: {
                                status: false,
                                url: true,
                                id: true
                            }
                        },
                        id: false,
                        diagnosticId: false,
                        imgId: false,
                        status: false
                    }
                },
                ...this.selectQueryParameters()
            }
        })

        if (!diagnostic) throw new BadRequestException('Diagnostic not found')

        return diagnostic
    }

    async updateDiagnostic(
        id: number,
        data: UpdateDiagnosticDto,
        files: Express.Multer.File[]
    ) {
        try {
            const { name, description, appointmentId } = data

            const diagnostic = await this.prisma.diagnostic.updateMany({
                where: { id, status: Status.ACTIVE },
                data: {
                    name,
                    description,
                    appointmentId
                }
            })

            if (!diagnostic.count || diagnostic.count === 0) {
                throw new BadRequestException('Diagnostic not found')
            }

            const diagnosticDB = await this.findOneDiagnostic(id)

            const imgsIds = []

            diagnosticDB.diagnosticInImgs.forEach(diagnosticInImg => {
                imgsIds.push({ id: diagnosticInImg.Img.id })
            })

            await this.fileService.updateUrlDB(files, imgsIds)

            return { ...data, id }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async deleteDiagnostic(id: number) {
        try {
            const diagnostic = await this.findOneDiagnostic(id)

            const imgsIds = []

            diagnostic.diagnosticInImgs.forEach(diagnosticInImg => {
                imgsIds.push({ id: diagnosticInImg.Img.id })
            })

            await this.fileService.disableDiagnosticImgs(id, imgsIds)

            await this.prisma.diagnostic.updateMany({
                where: { id, status: Status.ACTIVE },
                data: { status: Status.INACTIVE }
            })
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    private selectQueryParameters = () => {
        return {
            id: true,
            name: true,
            description: true,
            appointmentId: true,
            status: false
        }
    }

    private handleExceptions(error: any): never {
        if (error.code === 'P2025') {
            throw new BadRequestException(error.meta.cause)
        }

        if (error.code === 'P2003') throw new BadRequestException(error.meta)

        console.log(error)
        throw new InternalServerErrorException('Please check logs')
    }
}
