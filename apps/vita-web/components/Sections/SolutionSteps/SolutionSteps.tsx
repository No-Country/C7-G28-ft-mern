import React from 'react'
import { solutionsSteps } from 'lib/data/solutionStepsData'
import CircularCard from 'components/Cards/CircularCard/CircularCard'

export interface ISolutionSteps {}

const SolutionSteps: React.FC<ISolutionSteps> = () => {
    return (
        <section className="w-full flex flex-col items-center gap-[3.125rem] p-2">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-xl uppercase text-secondary-900">
                    Fastest Solutions
                </h1>
                <h2 className="text-4xl font-medium ">
                    4 easy steps to get your Solution
                </h2>
            </div>
            <div className="flex justify-between w-full">
                {solutionsSteps.map(step => (
                    <CircularCard
                        key={step.id}
                        title={step.title}
                        icon={step.icon}
                    />
                ))}
            </div>
        </section>
    )
}

export default SolutionSteps
