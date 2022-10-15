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

const specialities = []

const createSpecialities = num => {
    for (let i = 0; i < num; i++) {
        specialities.push({
            name: `Speciality ${i + 1}`,
            description: `Description ${i + 1}`
        })
    }
}

const createUsers = async (num: number) => {
    for (let i = 0; i < num; i++) {
        const hash = await argon.hash('password')
        const day = Math.floor(Math.random() * 30) + 1
        const month = Math.floor(Math.random() * 12) + 1
        const year = Math.floor(Math.random() * 50) + 1950
        const user = {
            firstName: `${names[i % names.length]}`,
            lastName: `${surnames[i % surnames.length]}`,
            email: `user${i + 1}@gmail.com`,
            hash,
            role: i > num - 20 ? Role.DOCTOR : Role.PATIENT,
            birthDate: `${day < 10 ? '0' + day : day}/${
                month < 10 ? '0' + month : month
            }/${year}`,
            phone: '123456789' + i,
            address: 'E. Lopez ' + i,
            city: `${cities[i % cities.length]}`,
            state: `${states[i % states.length]}`,
            country: `${countries[i % countries.length]}`,
            zipCode: `${i + 1000}`,
            verified: true
        }
        users.push(user)
    }
}

const main = async (users, specialities) => {
    await prisma.user.createMany({
        data: users
    })

    createSpecialities(20)

    await prisma.speciality.createMany({
        data: specialities
    })
}

createUsers(500).then(() => {
    main(users, specialities)
        .catch(e => {
            throw e
        })
        .finally(() => {
            prisma.$disconnect()
        })
})
