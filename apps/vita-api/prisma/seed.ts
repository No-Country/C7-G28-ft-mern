import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2'

enum Role {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR'
}

const prisma = new PrismaClient()

const users = []

const names = [
    'John',
    'Paul',
    'George',
    'Ringo',
    'Pete',
    'Mike',
    'Dave',
    'John',
    'Paul'
]

const surnames = [
    'Lennon',
    'McCartney',
    'Harrison',
    'Starr',
    'Townshend',
    'Davies',
    'Gilmour',
    'Bonham',
    'Rodgers',
    'Weller'
]

const createUsers = async (num: number) => {
    for (let i = 0; i < num; i++) {
        const hash = await argon.hash(`password${i}`)
        const user = {
            firstName: `${names[i % names.length]}`,
            lastName: `${surnames[i % surnames.length]}`,
            email: `user${i + 1}@gmail.com`,
            hash,
            role: i > num - 3 ? Role.DOCTOR : Role.PATIENT
        }
        users.push(user)
    }
}

const main = async users => {
    for (const user of users) {
        await prisma.user.create({
            data: user
        })
    }
}
createUsers(20).then(() => {
    main(users)
        .catch(e => {
            throw e
        })
        .finally(() => {
            prisma.$disconnect()
        })
})
