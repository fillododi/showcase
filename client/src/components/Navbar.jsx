import React, {useState} from "react";
import {Link} from "react-router-dom"
import {logo, menu, close} from "../assets/index.js"

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)

    const handleToggleMenu = ()=> setShowMenu(!showMenu)

    return <div className='w-full h-[80px] z-10 bg-white fixed drop-shadow-lg relative'>
        <div className='flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto'>
            <div className='flex items-center'>
                <Link to={'/'}><img src={logo} alt='logo' className='sm:ml-10 ss:ml-10 md:ml-3 opacity-[55%] w-full h-[25px]'/></Link>
            </div>
            <div className='flex items-center'>
                <ul className='hidden md:flex'>
                    <Link to={'/'}><li>Home</li></Link>
                    <Link to={'/book'}><li>Prenota il tuo Video</li></Link>
                    <Link to={'/gallery'}><li>Galleria</li></Link>
                    <li>Shop</li>
                </ul>
            </div>

            <div className='md:hidden' onClick={handleToggleMenu}>
                <img src={!showMenu? menu: close} alt='menu' className='w-[28px] h-[28px] object-contain mr-10'/>
            </div>
        </div>
        <ul className={showMenu? 'absolute bg-white w-full px-8 md:hidden': 'hidden'}>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/book'}><li>Prenota il tuo Video</li></Link>
            <Link to={'/gallery'}><li>Galleria</li></Link>
            <li>Shop</li>
        </ul>
    </div>
}

export default Navbar