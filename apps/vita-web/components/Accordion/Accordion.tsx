/* eslint-disable multiline-ternary */
import Image from 'next/image'
import { minusIcon, plusIcon } from 'public/icons'
import React, { useRef, useState } from 'react'
export interface IAccordion {
    title: string
    content: string
}

const Accordion: React.FC<IAccordion> = ({ title, content }) => {
    const [isOpened, setOpened] = useState<boolean>(false)
    const [height, setHeight] = useState<string>('0px')
    const contentElement = useRef<HTMLDivElement>(null)

    const HandleOpening = () => {
        setOpened(!isOpened)
        setHeight(
            !isOpened ? `${contentElement.current?.scrollHeight}px` : '0px'
        )
    }

    return (
        <div onClick={HandleOpening} className="border-b border-secondary-600">
            <div
                className={
                    'px-4 pt-6 pb-7 flex justify-between text-color-text'
                }
            >
                <h4 className="text-4xl">{title}</h4>
                {isOpened ? (
                    <Image src={minusIcon} alt="minus icon" />
                ) : (
                    <Image src={plusIcon} alt="plus icon" />
                )}
            </div>
            <div
                ref={contentElement}
                style={{ height }}
                className="overflow-hidden transition-all duration-200 w-3/4"
            >
                <p className="p-4 text-xl">{content}</p>
            </div>
        </div>
    )
}

export default Accordion
