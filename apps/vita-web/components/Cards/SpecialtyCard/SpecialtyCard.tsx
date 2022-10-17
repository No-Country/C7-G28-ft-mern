import Image from 'next/image'
import React from 'react'
export interface ISpecialtyCard {
    title: string
    description: string
    icon: any
}

const SpecialtyCard: React.FC<ISpecialtyCard> = ({
    title,
    description,
    icon
}) => {
    return (
        <div className="bg-secondary-100 w-[400px] h-52 p-7 flex flex-col gap-7 rounded-md">
            <div className="flex items-center gap-6">
                <Image src={icon} alt={title} width="55" height="55" />
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <p className="text-sm">{description}</p>
        </div>
    )
}

export default SpecialtyCard
