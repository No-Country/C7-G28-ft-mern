import Accordion from 'components/Accordion/Accordion'
import { frequentlyQuestionsData } from 'lib/data/frequentlyQuestionsData'
import React from 'react'
export interface IFrequentlyQuestions {}

const FrequentlyQuestions: React.FC<IFrequentlyQuestions> = () => {
    return (
        <section className="flex flex-col items-center py-24 gap-20">
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-xl text-secondary-900 uppercase">
                    frequently asked questions
                </h1>
                <p className="text-4xl">We got you Covered</p>
            </div>
            <div className="w-4/6">
                {frequentlyQuestionsData.map((item, index) => (
                    <Accordion
                        key={index}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </div>
        </section>
    )
}

export default FrequentlyQuestions
