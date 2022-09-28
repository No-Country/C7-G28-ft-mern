/* eslint-disable turbo/no-undeclared-env-vars */
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('main')

    const PORT = 3001

    app.setGlobalPrefix('api')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    await app.listen(PORT)
    logger.log(`Application listening on port ${PORT}`)
}
bootstrap()
