const PORT = 3333

const api = {
    auth: {
        signup: `http://localhost:${PORT}/api/auth/signup`,
        signin: `http://localhost:${PORT}/api/auth/signin`
    },
    user: {
        getAll: `http://localhost:${PORT}/api/users/all`,
        getOne: `http://localhost:${PORT}/api/users/one`,
        update: `http://localhost:${PORT}/api/users/update`,
        getMe: `http://localhost:${PORT}/api/users/me`,
        verify: `http://localhost:${PORT}/api/users/verify`,
        specialiy: `http://localhost:${PORT}/api/users/speciality`
    },
    speciality: {
        create: `http://localhost:${PORT}/api/specialities/create`,
        getAll: `http://localhost:${PORT}/api/specialities/all`,
        getOne: `http://localhost:${PORT}/api/specialities/one`,
        delete: `http://localhost:${PORT}/api/specialities/delete`
    },
    appointment: {
        create: `http://localhost:${PORT}/api/appointments`,
        getAll: `http://localhost:${PORT}/api/appointments`,
        getOne: `http://localhost:${PORT}/api/appointments`,
        delete: `http://localhost:${PORT}/api/appointments`,
        update: `http://localhost:${PORT}/api/appointments`
    },
    diagnostic: {
        create: `http://localhost:${PORT}/api/diagnostics`,
        getAll: `http://localhost:${PORT}/api/diagnostics`,
        getOne: `http://localhost:${PORT}/api/diagnostics`,
        delete: `http://localhost:${PORT}/api/diagnostics`,
        update: `http://localhost:${PORT}/api/diagnostics`
    },
    file: {
        getOne: `http://localhost:${PORT}/api/files/one`,
        getAll: `http://localhost:${PORT}/api/files/all`
    }
}

const signUpUser = {
    email: 'jorgito123456783423@gmas.com',
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
