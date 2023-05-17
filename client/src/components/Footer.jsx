import React from "react";
import {Link} from "react-router-dom"
import {FaFacebook, FaInstagram, FaYoutube, FaTiktok} from "react-icons/fa";
import {iacodr, moonriver, msc, odon, passidj, poke_experience, scugnizzi} from '../assets'

const Footer = () => {
    return <div className='w-full bg-[#02044A] text-gray-300 py-8 px-2'>
        <div className='max-w-[1240px] mx-auto flex flex-row items-center border-b-2 border-gray-600 grid grid-cols-7'>
            <div><img className='' src={iacodr}/></div>
            <div><img className='' src={moonriver}/></div>
            <div><img className='' src={msc}/></div>
            <div><img className='' src={odon}/></div>
            <div><img className='' src={passidj}/></div>
            <div><img className='' src={poke_experience}/></div>
            <div><img className='' src={scugnizzi}/></div>
        </div>

        <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
            <div>
                <h6 className='font-bold uppercase py-2'>Titoletto</h6>
                <ol>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                </ol>
            </div>
            <div>
                <h6 className='font-bold uppercase py-2'>Titoletto</h6>
                <ol>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                </ol>
            </div>
            <div>
                <h6 className='font-bold uppercase py-2'>Titoletto</h6>
                <ol>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                </ol>
            </div>
            <div>
                <h6 className='font-bold uppercase py-2'>Titoletto</h6>
                <ol>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                    <li className='py-1'>Oggetto</li>
                </ol>
            </div>

            <div className='col-span-2 pt-2 md:pt-2'>
                <p className='font-bold uppercase'>Iscriviti alla Newsletter</p>
                <p className='py-4'>Riceverai notizie, promozioni e novità da Showcase</p>
                <form className='flex flex-col sm:flex-row'>
                    <input className='w-full p-2 mr-4 rounded-md mb-2' type='email' placeholder='Inserisci la tua E-Mail'/>
                    <button className='p-2 mb-2 bg-[#00B86E]'>Iscriviti</button>
                </form>
            </div>

        </div>

        <div className='flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center'>
            <p className='pt-4'>2023 Showcase Mantova. Tutti i diritti riservati</p>
            <div className='flex justify-between sm:w-[300px] pt-4 text-2xl gap-2'>
                <Link to={'https://www.facebook.com/profile.php?id=100090278966698'}><FaFacebook/></Link>
                <Link to={'https://instagram.com/showcasemantova?igshid=MzRlODBiNWFlZA=='}><FaInstagram/></Link>
                <Link to={'https://www.tiktok.com/@showcasemantova?_t=8cMnmadxlmd&_r=1'}><FaTiktok/></Link>
                <Link to={'https://youtube.com/@ShowCaseMantova'}><FaYoutube/></Link>
            </div>
        </div>
    </div>
}

export default Footer