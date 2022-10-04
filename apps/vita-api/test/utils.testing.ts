const api = {
    auth: {
        signup: 'http://localhost:3333/api/auth/signup',
        signin: 'http://localhost:3333/api/auth/signin'
    },
    user: {
        getAll: 'http://localhost:3333/api/users/all',
        getOne: 'http://localhost:3333/api/users/one',
        update: 'http://localhost:3333/api/users/update',
        getMe: 'http://localhost:3333/api/users/me',
        verify: 'http://localhost:3333/api/users/verify',
        speciality: 'http://localhost:3333/api/users/speciality'
    },
    speciality: {
        create: 'http://localhost:3333/api/specialities/create',
        getAll: 'http://localhost:3333/api/specialities/all',
        getOne: 'http://localhost:3333/api/specialities/one',
        delete: 'http://localhost:3333/api/specialities/delete'
    }
}

const signUpUser = {
    email: 'jorgito@gmail.com',
    password: 'password',
    firstName: 'Jorge',
    lastName: 'Perez',
    city: 'Formosa',
    country: 'Argentina',
    state: 'Formosa',
    zipCode: '2000',
    phone: '123456789',
    birthDate: '09/09/1999',
    address: 'El dorado 123',
    role: 'PATIENT'
}

export { api, signUpUser }
