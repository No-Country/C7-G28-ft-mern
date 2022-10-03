import { ForbiddenException, Injectable } from '@nestjs/common'
import { Role } from 'src/auth/dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { EditUserDto } from './dto'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany()
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } })

        if (!user) {
            throw new ForbiddenException('User not found')
        }

        if (user.specialityId) {
            const speciality = await this.prisma.speciality.findUnique({
                where: { id: user.specialityId }
            })
            return { ...user, speciality }
        }

        return user
    }

    async updateUser(userId: number, dto: EditUserDto) {
        const newUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...dto,
                role: dto.role as Role
            }
        })
        delete newUser.hash
        return newUser
    }

    async verifyUser(token: string, id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) throw new ForbiddenException('User not found')

        if (user.vertificationCode !== token) {
            throw new ForbiddenException('Invalid token')
        }

        await this.prisma.user.update({
            where: { id },
            data: { verified: true, vertificationCode: null }
        })
        return { message: 'User verified' }
    }

    async addSpeciality(speciality: string, userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) throw new ForbiddenException('User not found')

        const spec = await this.prisma.speciality.findUnique({
            where: { name: speciality }
        })
        if (!spec) throw new ForbiddenException('Speciality not found')

        const newUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                speciality: {
                    connect: {
                        name: speciality
                    }
                }
            }
        })
        return { user: newUser }
    }
}
