import axios from 'axios'
import { useMultistepForm } from 'hooks/useMultistepForm'
import { FormEvent, useState } from 'react'
import { AccountForm } from './AccountForm'
import { AddressForm } from './AdressForm'
import { UserForm } from './UserForm'

type FormData = {
    firstName: string
    lastName: string
    birthDate: string
    phone: string
    country: string
    city: string
    address: string
    state: string
    zipCode: string
    email: string
    password: string
    role: string
}

const INITIAL_DATA: FormData = {
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    email: '',
    password: '',
    role: 'PATIENT'
}

function RegisterForm() {
    const [data, setData] = useState(INITIAL_DATA)
    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next
    } = useMultistepForm([
        <UserForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} />,
        <AccountForm {...data} updateFields={updateFields} />
    ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()

        axios
            .post('https://vita-api.onrender.com/api/auth/signup', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                window.location.href = '/auth/login'
            })
    }

    return (
        <form onSubmit={onSubmit} className="w-3/5">
            <div className="font-bold">
                {currentStepIndex + 1} / {steps.length}
            </div>
            <div className="flex flex-col gap-8">
                {step}
                <div className="flex gap-10">
                    {!isFirstStep && (
                        <button
                            type="button"
                            onClick={back}
                            className="bg-secondary-900 text-white w-full py-3 text-xl rounded-xl"
                        >
                            Back
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-secondary-900 text-white w-full py-3 text-xl rounded-xl"
                    >
                        {isLastStep ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm
