import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { NodemailerModule } from './nodemailer/nodemailer.module'
import { SpecialityModule } from './speciality/speciality.module'
import { AppointmentModule } from './appointment/appointment.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        UserModule,
        AuthModule,
        NodemailerModule,
        SpecialityModule,
        AppointmentModule
    ]
})
export class AppModule {}
