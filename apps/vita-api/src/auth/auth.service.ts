import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    signIn() {
        return { message: 'Bienvenido' }
    }
}
