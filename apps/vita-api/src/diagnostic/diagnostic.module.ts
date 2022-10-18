import { Module } from '@nestjs/common'
import { DiagnosticService } from './diagnostic.service'
import { DiagnosticController } from './diagnostic.controller'
import { FileModule } from '../file/file.module'

@Module({
    controllers: [DiagnosticController],
    providers: [DiagnosticService],
    imports: [FileModule]
})
export class DiagnosticModule {}
