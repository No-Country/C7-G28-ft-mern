import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SpecialityDto } from './dto'
import { SpecialityService } from './speciality.service'

@Controller('specialities')
export class SpecialityController {
    constructor(private SpecialityService: SpecialityService) {}

    @Get('all')
    async getAllSpecialities() {
        return await this.SpecialityService.getAllSpecialities()
    }

    @Get('one/:name')
    async getOneSpeciality(@Param('name') name: string) {
        return await this.SpecialityService.getOneSpeciality(name)
    }

    @Post('create')
    async createSpeciality(@Body() speciality: SpecialityDto) {
        return await this.SpecialityService.createSpeciality(speciality)
    }
}
