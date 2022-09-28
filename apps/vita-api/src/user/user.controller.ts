import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private UserService: UserService) {}

    @Get()
    getUsers() {
        return this.UserService.getAllUsers()
    }

    @Get(':id')
    getUser() {}
}
