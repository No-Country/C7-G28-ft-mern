import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'

@Injectable()
export class DiagnosticService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreateDiagnosticDto) {
        try {
            const { name, appointmentId, description } = data

            const diagnostic = this.prisma.diagnostic.create({
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

    findAll() {
        return `This action returns all diagnostic`
    }

    findOne(id: number) {
        return `This action returns a #${id} diagnostic`
    }

    update(id: number, updateDiagnosticDto: UpdateDiagnosticDto) {
        return `This action updates a #${id} diagnostic`
    }

    remove(id: number) {
        return `This action removes a #${id} diagnostic`
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
