import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { api, signUpUser } from './utils.testing'
import { AuthDtoSignUp } from 'src/auth/dto'
import { EditUserDto } from 'src/user/dto'
import { SpecialityDto } from 'src/speciality/dto'
import { CreateAppointmentDto } from '../src/appointment/dto/create-appointment.dto'
import { UpdateAppointmentDto } from '../src/appointment/dto/update-appointment.dto'
import { CreateDiagnosticDto, UpdateDiagnosticDto } from '../src/diagnostic/dto'

describe('End to End Testing', () => {
    let app: INestApplication
    let prisma: PrismaService
    const PORT = 3333
    const dto: AuthDtoSignUp = signUpUser
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        app = moduleRef.createNestApplication()

        app.setGlobalPrefix('api')

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true
            })
        )

        await app.init()
        await app.listen(PORT)
        prisma = moduleRef.get(PrismaService)
        await prisma.cleanDb()
    })

    afterAll(async () => {
        app.close()
    })

    describe('Auth', () => {
        describe('Signup', () => {
            it('Should create a new user if all fields are provided', () => {
                return pactum
                    .spec()
                    .post(api.auth.signup)
                    .withBody(dto)
                    .expectStatus(201)

                    .stores('id', 'id')
            })

            it("Should create a doctor if the role is 'doctor'", () => {
                return pactum
                    .spec()
                    .post(api.auth.signup)
                    .withBody({
                        ...dto,
                        role: 'DOCTOR',
                        email: 'doctor1@gmass.com'
                    })
                    .expectStatus(201)
            })

            describe("Shouldn't create a new user if", () => {
                it('email is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, email: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: [
                                'email must be an email',
                                'email should not be empty'
                            ],
                            error: 'Bad Request'
                        })
                })
                it('password is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, password: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['password should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('firstName is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, firstName: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['firstName should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('lastName is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, lastName: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['lastName should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('city is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, city: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['city should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('country is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, country: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['country should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('state is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, state: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['state should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('zipCode is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, zipCode: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['zipCode should not be empty'],
                            error: 'Bad Request'
                        })
                })
                it('phone is not provided', () => {
                    return pactum
                        .spec()
                        .post(api.auth.signup)
                        .withBody({ ...dto, phone: '' })
                        .expectStatus(400)
                        .expectJson({
                            statusCode: 400,
                            message: ['phone should not be empty'],
                            error: 'Bad Request'
                        })
                })
            })
        })

        describe('Signin', () => {
            it('Should signin a user', () => {
                return pactum
                    .spec()
                    .post(api.auth.signin)
                    .withBody({ email: dto.email, password: dto.password })
                    .expectStatus(201)

                    .stores('token', 'token')
            })

            it('Should throw if email is empty', () => {
                return pactum
                    .spec()
                    .post(api.auth.signin)
                    .withBody({ email: '', password: dto.password })
                    .expectStatus(400)
            })
            it('Should throw if password is empty', () => {
                return pactum
                    .spec()
                    .post(api.auth.signin)
                    .withBody({ email: dto.email, password: '' })
                    .expectStatus(400)
            })
            it('Should sing in a doctor', () => {
                return pactum
                    .spec()
                    .post(api.auth.signin)
                    .withBody({
                        email: 'doctor1@gmass.com',
                        password: dto.password
                    })
                    .expectStatus(201)
                    .stores('docToken', 'token')
            })
        })
    })

    describe('User', () => {
        describe('Get User', () => {
            it('Should get the current user if a token is provided', () => {
                return pactum
                    .spec()
                    .get(api.user.getMe)
                    .withHeaders({
                        Authorization: 'Bearer $S{token}'
                    })
                    .expectStatus(200)
            })
        })

        describe('Update User', () => {
            it('Should edit current user', () => {
                const dto: EditUserDto = {
                    firstName: 'John',
                    lastName: 'Doe',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA',
                    zipCode: '10001',
                    phone: '1234567890'
                }
                return pactum
                    .spec()
                    .put(api.user.update)
                    .withHeaders({
                        Authorization: 'Bearer $S{token}'
                    })
                    .withBody(dto)
                    .expectStatus(200)
                    .expectBodyContains(dto.firstName)
                    .expectBodyContains(dto.lastName)
            })
        })
    })

    describe('Speciality', () => {
        describe('Create Speciality', () => {
            it('Should create a new speciality', () => {
                const dto: SpecialityDto = {
                    name: 'Dentist',
                    description: 'Dentist description'
                }
                return pactum
                    .spec()
                    .post(api.speciality.create)
                    .withBody(dto)
                    .expectStatus(201)
            })
        })
        describe('Get Speciality', () => {
            it('Should get all specialities', () => {
                return pactum
                    .spec()
                    .get(api.speciality.getAll)
                    .expectStatus(200)
            })
        })
        describe('Update Speciality', () => {
            it('Should update a speciality', () => {
                const dto: SpecialityDto = {
                    name: 'Dentist',
                    description: 'Dentist Description but better'
                }
                return pactum
                    .spec()
                    .post(api.speciality.create)
                    .withBody(dto)
                    .expectStatus(201)
                    .expectBodyContains(dto.description)
            })
        })

        describe('Delete Speciality', () => {
            it('Should delete a speciality', () => {
                return pactum
                    .spec()
                    .delete(`${api.speciality.delete}/Dentist`)
                    .expectStatus(200)
                    .inspect()
            })
        })
    })

    describe('Appointment', () => {
        describe('Create an appointment', () => {
            const appointmentDto: CreateAppointmentDto = {
                date: '2022-09-09',
                time: '13:00',
                doctorId: 2
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
                    .withHeaders({
                        Authorization: 'Bearer $S{token}'
                    })
                    .withBody(appointmentDto)
                    .expectStatus(201)
                    .inspect()
            })

            it('Should throw if doctorId is missing', () => {
                return pactum
                    .spec()
                    .post(api.appointment.create)
                    .withHeaders({
                        Authorization: 'Bearer $S{token}'
                    })
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
                date: '2021-09-09',
                time: '78:00'
            }

            it('must launch without authorization', () => {
                return pactum
                    .spec()
                    .patch(`${api.appointment.update}/1`)
                    .withBody(appointmentDto)
                    .expectStatus(401)
            })

            it('Should update an appointment', () => {
                return pactum
                    .spec()
                    .patch(`${api.appointment.update}/1`)
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
                    .get(`${api.appointment.getOne}/1`)
                    .expectStatus(401)
            })

            it('Should get one appointment', () => {
                return pactum
                    .spec()
                    .get(`${api.appointment.getOne}/1`)
                    .withHeaders('Authorization', 'Bearer $S{token}')
                    .expectStatus(200)
            })
        })

        // describe('Delete an appointment', () => {
        //     it('must launch without authorization', () => {
        //         return pactum
        //             .spec()
        //             .delete(`${api.appointment.delete}/1`)
        //             .expectStatus(401)
        //     })

        //     it('Should delete an appointment', () => {
        //         return pactum
        //             .spec()
        //             .delete(`${api.appointment.delete}/1`)
        //             .withHeaders('Authorization', 'Bearer $S{token}')
        //             .expectStatus(200)
        //     })
        // })
    })

    describe('Diagnostic', () => {
        describe('Create a diagnostic', () => {
            const diagnosticDto: CreateDiagnosticDto = {
                name: 'Diagnostic 1',
                description: 'Description 1',
                appointmentId: '1'
            }

            it('Must launch without authorization', () => {
                return pactum
                    .spec()
                    .post(api.diagnostic.create)
                    .withBody(diagnosticDto)
                    .expectStatus(401)
            })

            it('Should throw if name is empty', () => {
                return pactum
                    .spec()
                    .post(api.diagnostic.create)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody({ ...diagnosticDto, name: '' })
                    .expectStatus(400)
            })

            it('Should throw if description is empty', () => {
                return pactum
                    .spec()
                    .post(api.diagnostic.create)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody({ ...diagnosticDto, description: '' })
                    .expectStatus(400)
            })

            it('Should throw if appointmentId is missing', () => {
                return pactum
                    .spec()
                    .post(api.diagnostic.create)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody({
                        ...diagnosticDto,
                        appointmentId: undefined
                    })
                    .expectStatus(400)
            })

            it('Should create a diagnostic', () => {
                return pactum
                    .spec()
                    .post(api.diagnostic.create)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody(diagnosticDto)
                    .expectStatus(201)
                    .stores('diagnosticId', 'id')
            })
        })

        describe('Update a diagnostic', () => {
            const diagnosticDto: UpdateDiagnosticDto = {
                name: 'Diagnostic 2',
                description: 'Description 2',
                appointmentId: '1'
            }

            it('must launch without authorization', () => {
                return pactum
                    .spec()
                    .patch(api.diagnostic.update + '/1')
                    .withBody(diagnosticDto)
                    .expectStatus(401)
            })

            it('Should update a diagnostic', () => {
                return pactum
                    .spec()
                    .patch(api.diagnostic.update + '/1')
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody(diagnosticDto)
                    .expectStatus(200)
            })

            it('Should throw if name is missing', () => {
                return pactum
                    .spec()
                    .patch(api.diagnostic.update + '/1')
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody({
                        description: diagnosticDto.description,
                        appointmentId: diagnosticDto.appointmentId
                    })
                    .expectStatus(400)
            })

            it('Should throw if description is missing', () => {
                return pactum
                    .spec()
                    .patch(api.diagnostic.update + '/1')
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody({
                        name: diagnosticDto.name,
                        appointmentId: diagnosticDto.appointmentId
                    })
                    .expectStatus(400)
            })

            it('Should throw if appointmentId is missing', () => {
                return pactum
                    .spec()
                    .patch(api.diagnostic.update + '/1')
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .withBody({
                        name: diagnosticDto.name,
                        description: diagnosticDto.description,
                        appointmentId: ''
                    })
                    .expectStatus(400)
            })
        })

        describe('Get all diagnostics', () => {
            it('must launch without authorization', () => {
                return pactum
                    .spec()
                    .get(api.diagnostic.getAll)
                    .expectStatus(401)
            })

            it('Should get all diagnostics', () => {
                return pactum
                    .spec()
                    .get(api.diagnostic.getAll)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .expectStatus(200)
            })
        })

        describe('Get one diagnostic', () => {
            it('must launch without authorization', () => {
                return pactum
                    .spec()
                    .get(api.diagnostic.getOne + '/1')
                    .expectStatus(401)
            })

            it('Should get one diagnostic', () => {
                return pactum
                    .spec()
                    .get(api.diagnostic.getOne + '/1')
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .expectStatus(200)
            })
        })

        describe('Delete a diagnostic', () => {
            it('must launch without authorization', () => {
                return pactum
                    .spec()
                    .delete(api.diagnostic.delete + '/1')
                    .expectStatus(401)
            })

            it('Should delete a diagnostic', () => {
                return pactum
                    .spec()
                    .delete(api.diagnostic.delete + '/1')
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .expectStatus(200)
            })
        })
    })
    describe('File', () => {
        describe('Get all files', () => {
            it('must launch without authorization', () => {
                return pactum.spec().get(api.file.getAll).expectStatus(401)
            })

            it('Should get all files', () => {
                return pactum
                    .spec()
                    .get(api.file.getAll)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .expectStatus(200)
            })
        })

        describe('Get one file', () => {
            it('must launch without authorization', () => {
                return pactum
                    .spec()
                    .get(`${api.file.getOne}/1`)
                    .expectStatus(401)
            })

            it('Should get one file', () => {
                return pactum
                    .spec()
                    .get(`${api.file.getOne}/1`)
                    .withHeaders('Authorization', 'Bearer $S{docToken}')
                    .expectStatus(200)
            })
        })
    })
})
