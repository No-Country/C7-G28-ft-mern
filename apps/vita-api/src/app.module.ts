import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { NodemailerModule } from './nodemailer/nodemailer.module'
import { SpecialityModule } from './speciality/speciality.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        UserModule,
        AuthModule,
        NodemailerModule,
        SpecialityModule
    ]
})
export class AppModule {}
