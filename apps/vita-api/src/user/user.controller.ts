import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private UserService: UserService) {}

    @Get()
    getUsers() {
        return this.UserService.getAllUsers()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe() {
        return { me: 'User Info' }
    }
}
