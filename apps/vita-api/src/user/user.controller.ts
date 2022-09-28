import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private UserService: UserService) {}
    @Get('all')
    getUsers() {
        return this.UserService.getAllUsers()
    }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log(id)
        return this.UserService.getUserById(Number(id))
    }
}
