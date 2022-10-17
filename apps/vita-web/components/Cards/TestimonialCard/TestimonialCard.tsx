import React from 'react'
import Image from 'next/image'
import { dobleQuoteIcon, starIcon } from 'public/icons'

export interface ITestimonialCard {
    rate: number
    testimonial: string
    name: string
}

const TestimonialCard: React.FC<ITestimonialCard> = ({
    name,
    rate,
    testimonial
}) => {
    return (
        <div className="bg-secondary-100 px-3 py-6 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <Image src={starIcon} alt="star icon" />
                    <Image src={starIcon} alt="star icon" />
                    <Image src={starIcon} alt="star icon" />
                    <Image src={starIcon} alt="star icon" />
                    <Image src={starIcon} alt="star icon" />
                    <span className="font-medium text-lg">{rate}</span>
                </div>
                <Image src={dobleQuoteIcon} alt="doble quote icon" />
            </div>
            <div className="p-2 flex flex-col gap-6">
                <p className="text-lg overflow-hidden h-[5.5rem] w-5/6 relative after:absolute after:bottom-2 after:right-0 after:h-5 after:w-1/2 after:bg-gradient-to-r after:from-transparent after:to-secondary-100 after:content-[''] after:group-hover:bg-gradient-to-r after:group-hover:from-transparent after:group-hover:to-inherit">
                    {testimonial}
                </p>
                <span className="font-semibold "> - {name}</span>
            </div>
        </div>
    )
}

export default TestimonialCard
