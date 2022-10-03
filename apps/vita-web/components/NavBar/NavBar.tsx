import React from 'react'

export interface INavBar {
    sampleTextProp: string
}

const NavBar: React.FC<INavBar> = ({ sampleTextProp }) => {
    return <div className="bg-red-400">{sampleTextProp}</div>
}

export default NavBar
