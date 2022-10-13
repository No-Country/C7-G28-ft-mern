import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Put,
    Query,
    UseGuards
} from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { EditUserDto } from './dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private UserService: UserService) {}
    @Get('all')
    getUsers() {
        return this.UserService.getAllUsers()
    }

    @Get('all/doctors')
    getAllDoctors() {
        return this.UserService.getAllDoctors()
    }

    @Get('all/patients')
    getAllPatients() {
        return this.UserService.getAllPatients()
    }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Get('one/:id')
    getUserById(@Param('id') id: string) {
        return this.UserService.getUserById(Number(id))
    }

    @UseGuards(JwtGuard)
    @Put('update')
    updateUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.UserService.updateUser(userId, dto)
    }

    @Get('verify')
    verifyUser(@Query('token') token: string, @Query('id') id: string) {
        return this.UserService.verifyUser(token, Number(id))
    }

    @Patch('speciality')
    addSpeciality(
        @Query('sp') speciality: string,
        @Query('id') userId: string
    ) {
        return this.UserService.addSpeciality(speciality, Number(userId))
    }
}
