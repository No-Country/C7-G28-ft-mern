import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDtoSignIn, AuthDtoSignUp, Role } from './dto'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    async signIn(data: AuthDtoSignIn) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: data.email }
            })

            if (!user) {
                throw new ForbiddenException('Invalid credentials')
            }

            if (user.hash !== data.password) {
                throw new ForbiddenException('Invalid credentials')
            }

            delete user.hash

            return { user }
        } catch (error) {
            throw error
        }
    }

    signUp(data: AuthDtoSignUp) {
        //Falta el hash de la contraseña
        try {
            const user = this.prisma.user.create({
                data: {
                    email: data.email,
                    hash: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: (data.role as Role) || Role.PATIENCE
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
