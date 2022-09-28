import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

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
}
