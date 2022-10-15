import React from 'react'
import Image from 'next/image'
import logo from '../../../public/logo.svg'
import {
    facebookIcon,
    instagramIcon,
    twitterIcon,
    youtubeIcon
} from 'public/icons'
import Link from 'next/link'

export interface IFooter {}

const Footer: React.FC<IFooter> = () => {
    return (
        <footer className="bg-secondary-100 w-full h-full relative mt-28">
            <div className="absolute flex w-full px-40 h-[7.5rem] -top-[3.75rem]">
                <div className="bg-secondary-600 flex w-full items-center justify-center gap-[6.25rem] rounded-md">
                    <h1 className="text-white text-4xl font-medium">
                        Want to make an appointment easily?
                    </h1>
                    <button className="bg-background text-secondary-600 text-3xl font-medium px-8 py-3 rounded-md">
                        Contact Here
                    </button>
                </div>
            </div>
            <div className="flex py-36 px-40 gap-40">
                <div className="flex flex-col items-start gap-[3.125rem] text-xl">
                    <Image
                        src={logo}
                        alt="vita plus logo"
                        width={245}
                        height={90}
                    />
                    <p className="w-96">
                        We will always give our customers the best in order to
                        get the best experience.
                    </p>
                    <div className="flex flex-col gap-4">
                        <span>Call Center (123) 456-7890</span>
                        <span>Chat Center (123) 456-7890</span>
                    </div>
                    <div className="flex flex-col gap-14 w-full">
                        <h2 className="font-medium">Follow us on social:</h2>
                        <div className="flex items-center justify-between ">
                            <Link href="/">
                                <Image
                                    src={facebookIcon}
                                    alt="facebook icon"
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="/">
                                <Image
                                    src={instagramIcon}
                                    alt="instagram icon"
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="/">
                                <Image
                                    src={twitterIcon}
                                    alt="twitter icon"
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="/">
                                <Image
                                    src={youtubeIcon}
                                    alt="youtube icon"
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-10">
                        <h2 className="text-3xl font-medium">
                            <span>Company</span>
                        </h2>
                        <ul className="flex flex-col gap-10 text-2xl">
                            <li className="cursor-pointer">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Specialties</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">About Us</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Pharmacy</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-10">
                        <h2 className="text-3xl font-medium">
                            <span>Treatment</span>
                        </h2>
                        <ul className="flex flex-col gap-10 text-2xl">
                            <li className="cursor-pointer">
                                General Diagnosis
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Cardiology</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Opthalmology</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Dentistry</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Orthopaedics</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Pharmacy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-10">
                        <h2 className="text-3xl font-medium">
                            <span>Support</span>
                        </h2>
                        <ul className="flex flex-col gap-10 text-2xl">
                            <li className="cursor-pointer">
                                <Link href="/">Help Center</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Cookie settings</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
