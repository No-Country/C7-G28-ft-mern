import { Controller, Get } from '@nestjs/common'

@Controller('users')
export class UserController {
    // constructor() {}

    @Get()
    getUsers() {
        return 'getUsers'
    }

    @Get(':id')
    getUser() {}
}
