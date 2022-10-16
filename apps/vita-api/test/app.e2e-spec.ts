import * as pactum from 'pactum'
import { api, signUpUser } from './utils.testing'
import { AuthDtoSignUp } from '../src/auth/dto'
import { CreateDiagnosticDto, UpdateDiagnosticDto } from '../src/diagnostic/dto'

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

        describe('Diagnostic', () => {
            describe('Create a diagnostic', () => {
                const diagnosticDto: CreateDiagnosticDto = {
                    name: 'Diagnostic 1',
                    description: 'Description 1',
                    appointmentId: 3
                }

                it('Must launch without authorization', () => {
                    return pactum
                        .spec()
                        .post(api.diagnostic.create)
                        .withBody(diagnosticDto)
                        .expectStatus(401)
                })

                it('Should create a diagnostic', () => {
                    return pactum
                        .spec()
                        .post(api.diagnostic.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody(diagnosticDto)
                        .expectStatus(201)
                        .stores('diagnosticId', 'id')
                })

                it('Should throw if name is empty', () => {
                    return pactum
                        .spec()
                        .post(api.diagnostic.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({ ...diagnosticDto, name: '' })
                        .expectStatus(400)
                })

                it('Should throw if description is empty', () => {
                    return pactum
                        .spec()
                        .post(api.diagnostic.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({ ...diagnosticDto, description: '' })
                        .expectStatus(400)
                })

                it('Should throw if appointmentId is missing', () => {
                    return pactum
                        .spec()
                        .post(api.diagnostic.create)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({
                            ...diagnosticDto,
                            appointmentId: undefined
                        })
                        .expectStatus(400)
                })
            })

            describe('Update a diagnostic', () => {
                const diagnosticDto: UpdateDiagnosticDto = {
                    name: 'Diagnostic 2',
                    description: 'Description 2',
                    appointmentId: 4
                }

                it('must launch without authorization', () => {
                    return pactum
                        .spec()
                        .patch(`${api.diagnostic.update}/$S{diagnosticId}`)
                        .withBody(diagnosticDto)
                        .expectStatus(401)
                })

                it('Should update a diagnostic', () => {
                    return pactum
                        .spec()
                        .patch(`${api.diagnostic.update}/$S{diagnosticId}`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody(diagnosticDto)
                        .expectStatus(200)
                })

                it('Should throw if name is missing', () => {
                    return pactum
                        .spec()
                        .patch(`${api.diagnostic.update}/$S{diagnosticId}`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({
                            description: diagnosticDto.description,
                            appointmentId: diagnosticDto.appointmentId
                        })
                        .expectStatus(200)
                })

                it('Should throw if description is missing', () => {
                    return pactum
                        .spec()
                        .patch(`${api.diagnostic.update}/$S{diagnosticId}`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({
                            name: diagnosticDto.name,
                            appointmentId: diagnosticDto.appointmentId
                        })
                        .expectStatus(200)
                })

                it('Should throw if appointmentId is missing', () => {
                    return pactum
                        .spec()
                        .patch(`${api.diagnostic.update}/$S{diagnosticId}`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .withBody({
                            name: diagnosticDto.name,
                            description: diagnosticDto.description
                        })
                        .expectStatus(200)
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
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .expectStatus(200)
                })
            })

            describe('Get one diagnostic', () => {
                it('must launch without authorization', () => {
                    return pactum
                        .spec()
                        .get(`${api.diagnostic.getOne}/$S{diagnosticId}`)
                        .expectStatus(401)
                })

                it('Should get one diagnostic', () => {
                    return pactum
                        .spec()
                        .get(`${api.diagnostic.getOne}/$S{diagnosticId}`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .expectStatus(200)
                })
            })

            describe('Delete a diagnostic', () => {
                it('must launch without authorization', () => {
                    return pactum
                        .spec()
                        .delete(`${api.diagnostic.delete}/$S{diagnosticId}`)
                        .expectStatus(401)
                })

                it('Should delete a diagnostic', () => {
                    return pactum
                        .spec()
                        .delete(`${api.diagnostic.delete}/$S{diagnosticId}`)
                        .withHeaders('Authorization', 'Bearer $S{token}')
                        .expectStatus(200)
                })
            })
        })
    })
})
