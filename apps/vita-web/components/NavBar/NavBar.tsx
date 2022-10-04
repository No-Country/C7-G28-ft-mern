import React from 'react'

export interface INavBar {
    isLogged: boolean
}

const NavBar: React.FC<INavBar> = ({ isLogged }) => {
    return <div className="bg-green-400">{isLogged && 'hola'}</div>
}

export default NavBar
