import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'

describe('App End to End Test', () => {
    let app: INestApplication
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        app = moduleRef.createNestApplication()

        app.setGlobalPrefix('api')

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true
            })
        )

        await app.init()
    })

    afterAll(async () => {
        app.close()
    })
    it.todo('should pass')
})
