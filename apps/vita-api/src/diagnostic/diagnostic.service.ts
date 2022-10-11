import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common'
import { Status } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'

@Injectable()
export class DiagnosticService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateDiagnosticDto) {
        try {
            const { name, appointmentId, description } = data

            const diagnostic = await this.prisma.diagnostic.create({
                data: {
                    name,
                    appointmentId,
                    description,
                    status: 'ACTIVE'
                },
                select: this.selectQueryParameters()
            })

            return diagnostic
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    findAllDiagnostics() {
        return `This action returns all diagnostic`
    }

    async findOneDiagnostic(id: number) {
        const diagnostic = await this.prisma.diagnostic.findFirst({
            where: { id, status: Status.ACTIVE },
            select: this.selectQueryParameters()
        })

        if (!diagnostic) throw new BadRequestException('Diagnostic not found')

        return diagnostic
    }

    updateDiagnostic(id: number, updateDiagnosticDto: UpdateDiagnosticDto) {
        return `This action updates a #${id} diagnostic`
    }

    async deleteDiagnostic(id: number) {
        try {
            await this.prisma.diagnostic.updateMany({
                where: { id, status: Status.ACTIVE },
                data: { status: 'INACTIVE' }
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
        if (error.code === 'P2025')
            throw new BadRequestException(error.meta.cause)

        console.log(error)
        throw new InternalServerErrorException(`Please check logs`)
    }
}
