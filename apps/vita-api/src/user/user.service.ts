import { ForbiddenException, Injectable } from '@nestjs/common'
import { Role } from '../auth/dto'
import { PrismaService } from '../prisma/prisma.service'
import { EditUserDto } from './dto'

// Alejandro branch

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany({
            include: {
                speciality: true
            }
        })
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { speciality: true }
        })

        if (!user) {
            throw new ForbiddenException('User not found')
        }

        delete user.hash
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

    // Vincular una especilidad con un usuario
    async addSpeciality(speciality: string, userId: number) {
        // const user = await this.prisma.user.findUnique({
        //     where: { id: userId }
        // })
        // if (!user) throw new ForbiddenException('User not found')

        // const spec = await this.prisma.speciality.findUnique({
        //     where: { name: speciality }
        // })
        // if (!spec) throw new ForbiddenException('Speciality not found')
        try {
            const newUser = await this.prisma.user.update({
                where: { id: userId },
                data: {
                    speciality: {
                        connect: {
                            name: speciality
                        }
                    }
                },
                include: {
                    speciality: true
                }
            })
            return newUser
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async getAllDoctors() {
        try {
            return this.prisma.user.findMany({
                where: {
                    role: Role.DOCTOR
                },
                include: {
                    speciality: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async getAllPatients() {
        try {
            return this.prisma.user.findMany({
                where: {
                    role: Role.PATIENT
                },
                include: {
                    speciality: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
}
