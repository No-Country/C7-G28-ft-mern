import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDtoSignIn, AuthDtoSignUp, Role } from './dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { NodemailerService } from 'src/nodemailer/nodemailer.service'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private mailer: NodemailerService
    ) {}

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

        const token = await this.signToken(user.id, user.email)
        return { token }
    }

    async signUp(data: AuthDtoSignUp, host: string) {
        try {
            const hash = await argon.hash(data.password)
            delete data.password
            const user = await this.prisma.user.create({
                data: {
                    ...data,
                    role: data.role as Role,
                    hash
                },
                // data: {
                //     email: data.email,
                //     hash,
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     role: data.role as Role,
                //     birthDate: data.birthDate,
                //     country: data.country,
                //     state: data.state,
                //     city: data.city,
                //     address: data.address,
                //     zipCode: data.zipCode,
                //     phone: data.phone
                // },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true,
                    vertificationCode: true
                }
            })
            const verifyLink = `http://${host}/api/users/verify?token=${user.vertificationCode}&id=${user.id}`

            const mailOptions = {
                from: 'Vita App <vita.app.new@gmail.com>',
                to: user.email,
                subject: 'Welcome to Vita App',
                text: 'Welcome to Vita App',
                html: `<h1>Welcome to Vita App</h1>
            <p>Thank you for registering with Vita App. Please click the link below to verify your email address.</p>
            <a href="${verifyLink}">Verify Email</a>
            `
            }

            const mailInfo = await this.mailer.mailSender(mailOptions)
            return { user, mailInfo }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already in use')
                }
            }
            throw new Error(error)
        }
    }

    private async signToken(userId: number, email: string) {
        const data = {
            sub: userId,
            email
        }
        return this.jwt.signAsync(data, {
            expiresIn: '1d',
            secret: this.config.get('JWT_SECRET')
        })
    }
}
