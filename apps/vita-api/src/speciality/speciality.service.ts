import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SpecialityDto } from './dto'

@Injectable()
export class SpecialityService {
    constructor(private prisma: PrismaService) {}

    async getAllSpecialities() {
        const specialities = await this.prisma.speciality.findMany()
        return { specialities }
    }

    async getOneSpeciality(name: string) {
        const speciality = await this.prisma.speciality.findUnique({
            where: {
                name
            }
        })
        return { speciality }
    }

    async createSpeciality(speciality: SpecialityDto) {
        const newSpeciality = await this.prisma.speciality.upsert({
            create: {
                ...speciality
            },
            update: {
                ...speciality
            },
            where: {
                name: speciality.name as string
            }
        })
        return { speciality: newSpeciality }
    }

    async deleteSpeciality(name: string) {
        const speciality = await this.prisma.speciality.delete({
            where: {
                name
            }
        })
        return { speciality }
    }
}
