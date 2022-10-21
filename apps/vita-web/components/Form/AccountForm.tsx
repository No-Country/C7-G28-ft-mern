import { FormWrapper } from './FormWrapper'

type AccountData = {
    email: string
    password: string
}

type AccountFormProps = AccountData & {
    updateFields: (fields: Partial<AccountData>) => void
}

export function AccountForm({
    email,
    password,
    updateFields
}: AccountFormProps) {
    return (
        <FormWrapper title="Account Creation">
            <div className="flex flex-col">
                <label className="text-xl">Email</label>
                <input
                    autoFocus
                    required
                    type="email"
                    value={email}
                    onChange={e => updateFields({ email: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">Password</label>
                <input
                    required
                    type="password"
                    value={password}
                    onChange={e => updateFields({ password: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
        </FormWrapper>
    )
}
