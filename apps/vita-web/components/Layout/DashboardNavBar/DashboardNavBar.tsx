import Image from 'next/image'
import { bellIcon, searchIcon, settingsIcon } from 'public/icons'
import React from 'react'
export interface IDashboardNavBar {}

const DashboardNavBar: React.FC<IDashboardNavBar> = () => {
    return (
        <div className="w-full h-36 pt-8 px-20 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Welcome back Jhon Doe!</h1>
            <div className="border py-2 px-8 rounded-2xl w-[500px] flex items-center">
                <Image
                    src={searchIcon}
                    alt="search icon"
                    width="40"
                    height="40"
                />
                <input type="text" />
            </div>
            <div className="flex items-center gap-10">
                <div className="bg-secondary-100 w-14 h-14 flex items-center justify-center rounded-full relative">
                    <Image
                        src={bellIcon}
                        alt="bell icon"
                        width="30"
                        height="30"
                    />
                    <div className="w-4 h-4 bg-secondary-900 absolute top-0 right-0 rounded-full" />
                </div>
                <div className="bg-secondary-100 w-14 h-14 flex items-center justify-center rounded-full">
                    <Image
                        src={settingsIcon}
                        alt="settings icon"
                        width="30"
                        height="30"
                    />
                </div>
            </div>
        </div>
    )
}

export default DashboardNavBar
