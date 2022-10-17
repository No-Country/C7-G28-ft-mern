import SpecialtyCard from 'components/Cards/SpecialtyCard/SpecialtyCard'
import { specialtiesData } from 'lib/data/specialtiesData'
import Link from 'next/link'
import React from 'react'
export interface ISpecialties {}

const Specialties: React.FC<ISpecialties> = () => {
    return (
        <section className="pb-[6.25rem] pt-40 flex flex-col gap-20 items-center justify-center">
            <div className="flex flex-col items-center text-center gap-3">
                <h1 className="text-4xl font-medium">
                    Our <span className="text-secondary-900">Specialties</span>
                </h1>
                <p className="text-2xl">
                    We provide world-class consulting services with the best
                    medical team. <br />
                    Need to se more specialist?{' '}
                    <span className="text-secondary-900 underline underline-offset-4">
                        {' '}
                        <Link href="">View here</Link>
                    </span>
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-y-[3.125rem] justify-between gap-x-1">
                {specialtiesData.map(specialty => (
                    <SpecialtyCard
                        key={specialty.id}
                        title={specialty.name}
                        description={specialty.description}
                        icon={specialty.icon}
                    />
                ))}
            </div>
        </section>
    )
}
export default Specialties
