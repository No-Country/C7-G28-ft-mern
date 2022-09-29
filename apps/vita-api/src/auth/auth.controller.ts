import { Body, Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'

import { AuthService } from './auth.service'
import { AuthDtoSignIn, AuthDtoSignUp } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    @Post('signin')
    signIn(@Body() data: AuthDtoSignIn) {
        return this.AuthService.signIn(data)
    }

    @Post('signup')
    signUp(@Body() data: AuthDtoSignUp, @Req() req: Request) {
        return this.AuthService.signUp(data, req.headers.host)
    }
}
