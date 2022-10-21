import { ReactNode } from 'react'

type FormWrapperProps = {
    title: string
    children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <div className="flex flex-col gap-14">
            <h2 className="text-4xl font-semibold text-center">{title}</h2>
            <div className="flex flex-col gap-10">{children}</div>
        </div>
    )
}
