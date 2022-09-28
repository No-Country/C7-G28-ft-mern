import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDtoSignIn, AuthDtoSignUp, Role } from './dto'
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    async signIn(data: AuthDtoSignIn) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (!user) {
            throw new ForbiddenException('Invalid credentials')
        }

        const valid = await argon.verify(user.hash, data.password)
        if (!valid) {
            throw new ForbiddenException('Invalid credentials')
        }

        console.log(user.hash)

        delete user.hash

        return { user }
    }

    async signUp(data: AuthDtoSignUp) {
        try {
            const hash = await argon.hash(data.password)
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    hash,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role as Role
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true
                }
            })
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already in use')
                }
            }
            throw new Error(error)
        }
    }
}
