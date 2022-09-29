/* eslint-disable no-unused-vars */
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

const countries = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Costa Rica'
]

const states = [
    'Buenos Aires',
    'Cordoba',
    'Santa Fe',
    'Mendoza',
    'Tucuman',
    'Salta',
    'San Juan'
]

const cities = [
    'Buenos Aires',
    'Cordoba',
    'Santa Fe',
    'Mendoza',
    'Tucuman',
    'Salta'
]

const createUsers = async (num: number) => {
    for (let i = 0; i < num; i++) {
        const hash = await argon.hash('password')
        const user = {
            firstName: `${names[i % names.length]}`,
            lastName: `${surnames[i % surnames.length]}`,
            email: `user${i + 1}@gmail.com`,
            hash,
            role: i > num - 3 ? Role.DOCTOR : Role.PATIENT,
            birthDate: '09/09/1999',
            phone: '123456789' + i,
            address: 'E. Lopez' + i,
            city: `${cities[i % cities.length]}`,
            state: `${states[i % states.length]}`,
            country: `${countries[i % countries.length]}`,
            zipCode: `${i + 1000}`
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
createUsers(100).then(() => {
    main(users)
        .catch(e => {
            throw e
        })
        .finally(() => {
            prisma.$disconnect()
        })
})
