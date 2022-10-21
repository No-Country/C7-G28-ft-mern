import Image from 'next/image'
import {
    appointmentIcon,
    calendarIcon,
    documentIcon,
    homeIcon,
    userIcon
} from 'public/icons'
import React from 'react'
import logo from '../../../public/logo.svg'

export interface ISidebar {}

const Sidebar: React.FC<ISidebar> = () => {
    return (
        <div className="w-80 h-screen py-6 gap-32 flex flex-col bg-white">
            <div className="flex item-center justify-center">
                <Image
                    src={logo}
                    alt="vita plus logo"
                    width={200}
                    height={90}
                />
            </div>
            <div className="flex flex-col gap-16 justify-center pl-16">
                <div className="flex items-center w-full gap-8">
                    <Image
                        src={homeIcon}
                        alt="home icon"
                        width={28}
                        height={28}
                    />
                    <span>Home</span>
                </div>
                <div className="flex items-center w-full gap-8">
                    <Image
                        src={userIcon}
                        alt="home icon"
                        width={28}
                        height={28}
                    />
                    <span>My Profile</span>
                </div>
                <div className="flex items-center w-full gap-8">
                    <Image
                        src={calendarIcon}
                        alt="home icon"
                        width={28}
                        height={28}
                    />
                    <span>Calendar</span>
                </div>
                <div className="flex items-center w-full gap-8">
                    <Image
                        src={appointmentIcon}
                        alt="home icon"
                        width={28}
                        height={28}
                    />
                    <span>Appointments</span>
                </div>
                <div className="flex items-center w-full gap-8">
                    <Image
                        src={documentIcon}
                        alt="home icon"
                        width={28}
                        height={28}
                    />
                    <span>Prescriptions</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
