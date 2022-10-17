import React from 'react'
import Image from 'next/image'
import { circularCheckIcon } from 'public/icons'
import consultImage from '../../../public/consult-image.png'

export interface ITeamExperience {}

const TeamExperience: React.FC<ITeamExperience> = () => {
    return (
        <section className="flex w-full py-24 justify-between">
            <div className="w-1/2 flex flex-col gap-20">
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl font-semibold">
                        Our qualified team is
                        <br /> ready to help you
                    </h1>
                    <p className="text-2xl">
                        Our best team doctor with complete and modern facilities{' '}
                        <br />
                        will{' '}
                        <span className="text-secondary-900">
                            keep you healty
                        </span>{' '}
                        or return you to health form sick.
                    </p>
                </div>
                <div className="flex flex-col gap-16">
                    <div className="flex w-full justify-between">
                        <div className="flex items-center gap-3">
                            <Image
                                src={circularCheckIcon}
                                alt="circular check icon"
                                width="32px"
                                height="32px"
                            />
                            <p className="text-lg">10+ Years of experience</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image
                                src={circularCheckIcon}
                                alt="circular check icon"
                                width="32px"
                                height="32px"
                            />
                            <p className="text-lg">
                                Multi Specialty Medical Clinic
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full gap-72">
                        <div className="flex items-center gap-3">
                            <Image
                                src={circularCheckIcon}
                                alt="circular check icon"
                                width="32px"
                                height="32px"
                            />
                            <p className="text-lg">
                                Professional experts Doctor
                            </p>
                        </div>
                        <button className="bg-primary-600 text-white px-8 py-4 font-medium">
                            Book An Appointment
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Image src={consultImage} alt="doctor consult image" />
            </div>
        </section>
    )
}

export default TeamExperience
