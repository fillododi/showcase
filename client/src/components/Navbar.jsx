import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {logo, menu, close} from "../assets/index.js"

import './Navbar/styles.css'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const handleToggleMenu = () => {
        if(showMenu === true){
            setShowMenu(false)
        } else {
            setShowMenu(true)
        }
    }


    return <div className='w-full h-[80px] z-[999] bg-[#cfcebe] fixed top-0 drop-shadow-lg'>
        <div className='flex justify-between items-center w-full h-full md:max-w-[1240px] mx-auto'>
            <div className='flex items-center'>
                <Link to={'/'} className='px-0'><img src={logo} alt='logo' className='ml-6 opacity-[85%] h-[25px]'/></Link>
            </div>
            <div className='flex items-center'>
                <ul className='hidden md:flex' id='big-screen-menu'>
                    <Link to={'/'}><li>Home</li></Link>
                    <Link to={'/book'}><li>Prenota il tuo Video</li></Link>
                    <Link to={'/summeredit'}><li>Summer Edit</li></Link>
                    <Link to={'/gallery'}><li>Galleria</li></Link>
                </ul>
            </div>

            <button className='md:hidden bg-transparent border-transparent' id='menu' onClick={()=>handleToggleMenu()}>
                <img src={!showMenu? menu: close} alt='menu' className='w-[28px] h-[28px] object-contain mr-4'/>
            </button>
        </div>
        <ul className={showMenu? 'flex flex-col md:hidden show-menu': 'flex flex-col'} id='mobile-menu'>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/book'}><li>Prenota il tuo Video</li></Link>
	        <Link to={'/summeredit'}><li>Summer Edit</li></Link>
            <Link to={'/gallery'}><li>Galleria</li></Link>
        </ul>
    </div>
}

export default Navbar
