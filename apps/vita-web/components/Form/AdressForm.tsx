import { FormWrapper } from './FormWrapper'

type AddressData = {
    country: string
    city: string
    state: string
    zipCode: string
    address: string
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm({
    country,
    city,
    state,
    zipCode,
    address,
    updateFields
}: AddressFormProps) {
    return (
        <FormWrapper title="Address">
            <div className="flex flex-col">
                <label className="text-xl">Country</label>
                <input
                    autoFocus
                    required
                    type="text"
                    value={country}
                    onChange={e => updateFields({ country: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">City</label>
                <input
                    required
                    type="text"
                    value={city}
                    onChange={e => updateFields({ city: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">State</label>
                <input
                    required
                    type="text"
                    value={state}
                    onChange={e => updateFields({ state: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">Address</label>
                <input
                    required
                    type="text"
                    value={address}
                    onChange={e => updateFields({ address: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-xl">Zip</label>
                <input
                    required
                    type="text"
                    value={zipCode}
                    onChange={e => updateFields({ zipCode: e.target.value })}
                    className="outline-none border-b border-secondary-900 py-2"
                />
            </div>
        </FormWrapper>
    )
}
