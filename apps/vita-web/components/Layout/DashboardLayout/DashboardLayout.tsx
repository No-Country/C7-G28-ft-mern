import React from 'react'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import Sidebar from '../Sidebar/Sidebar'
export interface IDashboardLayout {
    children: React.ReactNode
}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full h-screen">
                <DashboardNavBar />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
