import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy'
import { NodemailerService } from '../nodemailer/nodemailer.service'

@Module({
    providers: [AuthService, JwtStrategy, NodemailerService],
    controllers: [AuthController],
    imports: [JwtModule.register({})]
})
export class AuthModule {}
