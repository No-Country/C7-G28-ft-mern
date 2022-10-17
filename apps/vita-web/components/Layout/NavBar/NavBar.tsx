/* eslint-disable multiline-ternary */
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../../public/logo.svg'
import DownArrow from '../../../public/icons/down_arrow'
import Link from 'next/link'
import Router from 'next/router'

export interface INavBar {}

const NavBar: React.FC<INavBar> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <nav className="w-full h-[5.625rem] items-center justify-between px-[5.625rem] mt-2 xs:hidden lg:flex">
                <Image
                    src={logo}
                    width="162px"
                    height="60px"
                    alt="vita+ logo"
                />
                <ul className="flex items-center lg:gap-4 xl:gap-12">
                    <li className="text-color-text font-light text-xl mr-[2.5rem]">
                        <Link href="#">Home</Link>
                    </li>
                    <li className="text-color-text font-light text-xl mr-[2.5rem] flex items-center gap-2">
                        <Link href="#">Specialties</Link>
                        <div className="mb-[2px]">
                            <DownArrow color="#161618" />
                        </div>
                    </li>
                    <li className="text-color-text font-light text-xl mr-[2.5rem]">
                        <Link href="#">Pharmacy</Link>
                    </li>
                    <li className="text-color-text font-light text-xl mr-[2.5rem]">
                        <Link href="#">About Us</Link>
                    </li>
                </ul>
                <button
                    className="border-[2px] border-secondary-900 px-9 py-1 rounded-lg"
                    onClick={() => Router.push('/auth/login')}
                >
                    <span className="text-color-text text-lg">Login</span>
                </button>
            </nav>

            {/* Mobile NavBar */}
            <div className="w-full h-[5.625rem] px-6 flex items-center justify-between mt-2 lg:hidden">
                <Image
                    src={logo}
                    width="100px"
                    height="40px"
                    alt="vita+ logo"
                />

                <button
                    className="flex h-10 w-8 flex-col justify-center items-end gap-2"
                    onClick={handleMenuClick}
                >
                    <div className="h-[2px] w-full rounded-full bg-[#121617]" />
                    <div className="h-[2px] w-full rounded-full bg-[#121617]" />
                    <div className="h-[2px] w-1/2 rounded-full bg-[#121617]" />
                </button>

                {isMenuOpen ? (
                    <div className="fixed top-[6.6rem] right-0 w-full h-1/2 border-l border-color-text/30 flex flex-col border-b justify-center items-center pt-12 gap-10 pb-12">
                        <button
                            className="border-[2px] border-secondary-900 px-9 py-1 rounded-lg"
                            onClick={() => Router.push('/auth/login')}
                        >
                            <span className="text-color-text text-lg">
                                Login
                            </span>
                        </button>

                        <ul className="flex flex-col h-full gap-10 w-full items-center justify-center">
                            <li className="text-color-text text-[1.25rem]">
                                <Link href="#">Home</Link>
                            </li>
                            <li className="text-color-text text-[1.25rem]">
                                <Link href="#">Specialties</Link>
                            </li>
                            <li className="text-color-text text-[1.25rem]">
                                <Link href="#">Pharmacy</Link>
                            </li>
                            <li className="text-color-text text-[1.25rem]">
                                <Link href="#">About Us</Link>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default NavBar
