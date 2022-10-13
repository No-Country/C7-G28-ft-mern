import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
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

    @Delete('delete/:name')
    async deleteSpeciality(@Param('name') name: string) {
        return await this.SpecialityService.deleteSpeciality(name)
    }

    @Patch('update/:name')
    async updateSpeciality(
        @Param('name') name: string,
        @Body() speciality: SpecialityDto
    ) {
        return await this.SpecialityService.updateSpeciality(name, speciality)
    }
}
