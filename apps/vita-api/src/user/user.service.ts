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
        const user = this.prisma.user.findUnique({ where: { id } })

        if (!user) {
            throw new ForbiddenException('User not found')
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
}
