import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SpecialityDto } from './dto'

@Injectable()
export class SpecialityService {
    constructor(prisma: PrismaService) {}

    getAllSpecialities() {
        return [
            { id: 1, name: 'Speciality 1' },
            { id: 2, name: 'Speciality 2' },
            { id: 3, name: 'Speciality 3' }
        ]
    }

    getOneSpeciality(name: string) {
        return { id: 1, name: 'Speciality 1' }
    }

    createSpeciality(speciality: SpecialityDto) {
        return { speciality }
    }
}
