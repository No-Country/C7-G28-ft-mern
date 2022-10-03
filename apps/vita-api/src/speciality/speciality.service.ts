import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SpecialityDto } from './dto'

@Injectable()
export class SpecialityService {
    constructor(private prisma: PrismaService) {}

    async getAllSpecialities() {
        try {
            const specialities = await this.prisma.speciality.findMany()
            return { specialities }
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async getOneSpeciality(name: string) {
        try {
            const speciality = await this.prisma.speciality.findUnique({
                where: {
                    name
                }
            })
            return { speciality }
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async createSpeciality(speciality: SpecialityDto) {
        try {
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
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async deleteSpeciality(name: string) {
        try {
            const speciality = await this.prisma.speciality.delete({
                where: {
                    name
                }
            })
            return { speciality }
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
}
