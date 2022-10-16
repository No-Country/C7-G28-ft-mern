const api = {
    auth: {
        signup: 'http://localhost:4000/api/auth/signup',
        signin: 'http://localhost:4000/api/auth/signin'
    },
    user: {
        getAll: 'http://localhost:4000/api/users/all',
        getOne: 'http://localhost:4000/api/users/one',
        update: 'http://localhost:4000/api/users/update',
        getMe: 'http://localhost:4000/api/users/me',
        verify: 'http://localhost:4000/api/users/verify',
        speciality: 'http://localhost:4000/api/users/speciality'
    },
    speciality: {
        create: 'http://localhost:4000/api/specialities/create',
        getAll: 'http://localhost:4000/api/specialities/all',
        getOne: 'http://localhost:4000/api/specialities/one',
        delete: 'http://localhost:4000/api/specialities/delete'
    },
    appointment: {
        create: 'http://localhost:4000/api/appointment',
        getAll: 'http://localhost:4000/api/appointment',
        getOne: 'http://localhost:4000/api/appointment',
        delete: 'http://localhost:4000/api/appointment',
        update: 'http://localhost:4000/api/appointment'
    }
}

const signUpUser = {
    email: 'user2@gmail.com',
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
