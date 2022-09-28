import { PrismaClient } from '@prisma/client'

enum Role {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR'
}

const prisma = new PrismaClient()

const users = []

for (let i = 0; i < 10; i++) {
    const user = {
        firstName: `User ${i}`,
        lastName: `User ${i}`,
        email: `user${i}@gmail.com`,
        hash: `password${i}`,
        role: i > 8 ? Role.DOCTOR : Role.PATIENT
    }
    users.push(user)
}

const main = async users => {
    for (const user of users) {
        await prisma.user.create({
            data: user
        })
    }
}

main(users)
    .catch(e => {
        throw e
    })
    .finally(() => {
        prisma.$disconnect()
    })
