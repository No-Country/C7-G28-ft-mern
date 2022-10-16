import * as pactum from 'pactum'
import { api, signUpUser } from './utils.testing'
import { AuthDtoSignUp } from '../src/auth/dto'
import { Appointment } from 'prisma/prisma-client'
import { CreateAppointmentDto } from '../src/appointment/dto'
import { UpdateAppointmentDto } from '../src/appointment/dto/update-appointment.dto'

describe('End to End Testing', () => {
    const dto: AuthDtoSignUp = signUpUser

    describe('Auth', () => {
        describe('Signin', () => {
            it('Should signin a user', () => {
                return pactum
                    .spec()
                    .post(api.auth.signin)
                    .withBody({ email: dto.email, password: dto.password })
                    .expectStatus(201)

                    .stores('token', 'token')
            })
        })

        describe('Appointment', () => {
            describe('Create an appointment', () => {
                const appointmentDto: CreateAppointmentDto = {
                    date: '2020-09-09',
                    time: '10:00',
                    doctorId: 19
                }

                it('Must launch without authorization', () => {
                    return pactum
                        .spec()
                        .post(api.appointment.create)
                        .withBody(appointmentDto)
                        .expectStatus(401)
                })

                it('Should create an appointment', () => {
                    return pactum
                        .spec()
                        .post(api.appointment.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody(appointmentDto)
                        .expectStatus(201)
                })

                it('Should throw if doctorId is missing', () => {
                    return pactum
                        .spec()
                        .post(api.appointment.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({ ...appointmentDto, doctorId: undefined })
                        .expectStatus(400)
                })

                it('Should throw if date is empty', () => {
                    return pactum
                        .spec()
                        .post(api.appointment.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({ ...appointmentDto, date: '' })
                        .expectStatus(400)
                })

                it('Should throw if time is empty', () => {
                    return pactum
                        .spec()
                        .post(api.appointment.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({ ...appointmentDto, time: '' })
                        .expectStatus(400)
                })
            })

            describe('Update an appointment', () => {
                const appointmentDto: UpdateAppointmentDto = {
                    date: '2020-09-09',
                    time: '11:00'
                }

                it('must launch without authorization', () => {
                    return pactum
                        .spec()
                        .patch(`${api.appointment.update}/6`)
                        .withBody(appointmentDto)
                        .expectStatus(401)
                })

                it('Should update an appointment', () => {
                    return pactum
                        .spec()
                        .patch(`${api.appointment.update}/6`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody(appointmentDto)
                        .expectStatus(200)
                })
            })

            describe('Get all appointments', () => {
                it('must launch without authorization', () => {
                    return pactum
                        .spec()
                        .get(api.appointment.getAll)
                        .expectStatus(401)
                })

                it('Should get all appointments', () => {
                    return pactum
                        .spec()
                        .get(api.appointment.getAll)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .expectStatus(200)
                })
            })

            describe('Get one appointment', () => {
                it('must launch without authorization', () => {
                    return pactum
                        .spec()
                        .get(`${api.appointment.getOne}/6`)
                        .expectStatus(401)
                })

                it('Should get one appointment', () => {
                    return pactum
                        .spec()
                        .get(`${api.appointment.getOne}/6`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .expectStatus(200)
                })
            })
        })
    })
})
