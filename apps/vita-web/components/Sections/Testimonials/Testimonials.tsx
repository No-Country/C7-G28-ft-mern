import React, { useState } from 'react'
import TestimonialCard from 'components/Cards/TestimonialCard/TestimonialCard'
import Image from 'next/image'
import testimonialImage from '../../../public/testimonials-image.png'
import { backArrowRounded, nextArrowRounded } from 'public/icons'
import { testimonialsData } from 'lib/data/testimonialsData'

export interface ITestimonials {}

const Testimonials: React.FC<ITestimonials> = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [animate, setAnimate] = useState(false)

    const handleNextTestimonial = () => {
        if (currentTestimonial === testimonialsData.length - 1) {
            setCurrentTestimonial(0)
        } else {
            setCurrentTestimonial(current => {
                return current + 1
            })
        }

        setAnimate(true)

        setTimeout(() => {
            setAnimate(false)
        }, 450)
    }

    const handlePreviousTestimonial = () => {
        if (currentTestimonial === 0) {
            setCurrentTestimonial(testimonialsData.length - 1)
        } else {
            setCurrentTestimonial(current => {
                return current - 1
            })
        }
        setAnimate(true)

        setTimeout(() => {
            setAnimate(false)
        }, 450)
    }

    return (
        <section className="py-24 flex flex-col items-center gap-16">
            <div className="text-center flex flex-col gap-4">
                <h1 className="uppercase text-xl text-secondary-900">
                    Testimonials
                </h1>
                <p className="text-4xl font-medium">
                    What our patients says about us
                </p>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex-1">
                    <Image
                        src={testimonialImage}
                        alt="testimonial image"
                        height="450"
                        width="650"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-12">
                    <p className="text-2xl">
                        Most of our user give us feedback regarding our
                        services.
                        <br /> You can see their comments on bellow
                    </p>
                    <div className="flex flex-col">
                        <div
                            className={
                                'w-5/6 ' + (animate ? 'animate-fade-in' : '')
                            }
                        >
                            <TestimonialCard
                                name={testimonialsData[currentTestimonial].name}
                                rate={testimonialsData[currentTestimonial].rate}
                                testimonial={
                                    testimonialsData[currentTestimonial]
                                        .testimonial
                                }
                            />
                        </div>
                        <div className="flex gap-10 mt-4 ml-[545px]">
                            <button onClick={handlePreviousTestimonial}>
                                <Image
                                    src={backArrowRounded}
                                    alt="back arrow icon"
                                    width={40}
                                    height={40}
                                />
                            </button>
                            <button onClick={handleNextTestimonial}>
                                <Image
                                    src={nextArrowRounded}
                                    alt="next arrow icon"
                                    width={40}
                                    height={40}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
