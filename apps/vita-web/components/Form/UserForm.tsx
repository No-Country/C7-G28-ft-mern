import { FormWrapper } from './FormWrapper'

type UserData = {
    firstName: string
    lastName: string
    birthDate: string
    phone: string
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function UserForm({
    firstName,
    lastName,
    birthDate,
    phone,
    updateFields
}: UserFormProps) {
    return (
        <FormWrapper title="User Details">
            <div className="flex flex-col">
                <label className="text-xl">First Name</label>
                <input
                    autoFocus
                    required
                    type="text"
                    value={firstName}
                    onChange={e => updateFields({ firstName: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">Last Name</label>
                <input
                    required
                    type="text"
                    value={lastName}
                    onChange={e => updateFields({ lastName: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">Age</label>
                <input
                    required
                    min={1}
                    type="date"
                    value={birthDate}
                    onChange={e => updateFields({ birthDate: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">Phone number</label>
                <input
                    required
                    type="text"
                    value={phone}
                    onChange={e => updateFields({ phone: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
        </FormWrapper>
    )
}
