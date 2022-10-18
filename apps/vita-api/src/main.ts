/* eslint-disable turbo/no-undeclared-env-vars */
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('main')
    app.setGlobalPrefix('api')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    const config = new DocumentBuilder()
        .setTitle('Vita API')
        .setDescription('The Vita API description')
        .setVersion('1.0')
        .addTag('vita')
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api/docs', app, document)

    const PORT = process.env.PORT || 3001

    app.enableCors()

    await app.listen(PORT)
    logger.log(`Application listening on port ${PORT}`)
}
bootstrap()
