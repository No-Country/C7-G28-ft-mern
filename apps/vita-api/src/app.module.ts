import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { AppointmentModule } from './appointment/appointment.module';
import { DiagnosticModule } from './diagnostic/diagnostic.module';
import { FileModule } from './file/file.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        UserModule,
        AuthModule,
        AppointmentModule,
        DiagnosticModule,
        FileModule
    ]
})
export class AppModule {}
