import Image from 'next/image'
import React from 'react'
import headerImage from '../../../public/header-image.png'
export interface IHeader {}

const Header: React.FC<IHeader> = () => {
    return (
        <div className="flex flex-col gap-14 items-center pb-[9.375rem] pt-2">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl text-center">
                    Providing the best online <br /> medical{' '}
                    <span className="text-secondary-600">consultation</span>
                </h1>
                <h2 className="text-2xl text-center">
                    We provide the best consultation to you with the best doctor
                    in his field{' '}
                </h2>
            </div>
            <Image src={headerImage} alt="doctors team image" layout="fixed" />
        </div>
    )
}

export default Header
