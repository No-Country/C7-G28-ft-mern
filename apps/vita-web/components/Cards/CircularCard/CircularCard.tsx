import Image from 'next/image'
import React from 'react'
export interface ICircularCard {
    title: string
    icon: any
}

const CircularCard: React.FC<ICircularCard> = ({ title, icon }) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-[6.25rem] h-[6.25rem] bg-secondary-100 rounded-full flex items-center justify-center">
                <Image src={icon} alt="step 1 icon" />
            </div>
            <h2 className="text-2xl">{title}</h2>
        </div>
    )
}

export default CircularCard
