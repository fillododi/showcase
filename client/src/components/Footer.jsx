import React, {useState} from "react";
import axios from "axios";

import {Link} from "react-router-dom"
import {FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaEdge, FaEnvelope} from "react-icons/fa/index";

import { subscribeUser } from "@strapi-newsletter/react";

const Footer = () => {
    const [email, setEmail] = useState('')
    const [feedBack, setFeedBack] = useState('')
    const newsletterSignup = async (e) => {
        e.preventDefault()

        try{
            const response = await subscribeUser(email, `${import.meta.env.VITE_STRAPI_URL}`);
            setEmail('')
        } catch (e) {
            console.error(e)
        }

    }

    const submitFeedback = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post(`${import.meta.env.VITE_STRAPI_URL}/api/feedbacks`, {data: {feedback: feedBack}})
            setFeedBack('')
        } catch (e) {
            console.error(e)
        }
    }

    return <div className='w-full bg-[#cfcebe] text-gray-800 py-4 px-2'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-b-2 border-gray-600 py-2 px-2 gap-y-8 justify-center'>
            <div className='col-span-1 flex flex-col gap-y-4 text-2xl justify-evenly items-center'>
                <div className='pt-1 text-center'>
                    <p>Contattaci</p>
                    <div className='flex flex-col m-2 text-lg gap-y-2'>
                        <div className='flex flex-row gap-x-2 items-center justify-center'>
                            <FaWhatsapp/>
                            <Link to={'https://wa.me/message/M4W72FLVTQYLN1'}>+393519009424</Link>
                        </div>
                        <div className='flex flex-row gap-x-2 items-center justify-center'>
                            <FaEnvelope/>
                            <Link to={'mailto:info@showcasemantova.com'}>info@showcasemantova.com</Link>
                        </div>
                    </div>
                </div>
                {/*<div className='text-center pb-4'>
                    <p>Dove siamo</p>
                    <div className='text-lg'>
                        <p className='px-1 py-2'>Mantova 46100</p>
                    </div>
                </div>*/}
            </div>
            <div className='col-span-1 flex flex-col gap-y-4 text-2xl justify-evenly'>
                <div className='flex flex-row gap-x-3 justify-center'>
                    <FaFacebook/>
                    <Link to={'https://www.facebook.com/profile.php?id=100090278966698'} className='text-lg'>@Showcase Mantova</Link>
                </div>
                <div className='flex flex-row gap-x-3 justify-center'>
                    <FaInstagram/>
                    <Link to={'https://instagram.com/showcasemantova?igshid=MzRlODBiNWFlZA=='} className='text-lg'>@showcasemantova</Link>
                </div>
                <div className='flex flex-row gap-x-3 justify-center'>
                    <FaTiktok/>
                    <Link to={'https://www.tiktok.com/@showcasemantova?_t=8cMnmadxlmd&_r=1'} className='text-lg'>@showcasemantova</Link>
                </div>
                <div className='flex flex-row gap-x-3 justify-center'>
                    <FaYoutube/>
                    <Link to={'https://youtube.com/@ShowCaseMantova'} className='text-lg'>@ShowCaseMantova</Link>
                </div>
            </div>
            <div className='mx-16 my-4 md:mx-0 col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-y-4 justify-evenly'>
                <div>
                    <p className='font-bold uppercase'>Iscriviti alla Newsletter</p>
                    <p className='py-4'>Riceverai notizie, promozioni e novità da Showcase</p>
                    <form className='flex flex-col sm:flex-row' onSubmit={newsletterSignup}>
                        <input className='w-full p-2 mr-4 rounded-md mb-2 text-gray-600' required type='email' placeholder='Inserisci la tua E-Mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button className='p-2 mb-2 bg-[#00B86E]'>Iscriviti</button>
                    </form>
                </div>
                <div>
                    <p className='font-bold uppercase'>Inviaci un Feedback</p>
                    <p className='py-4'>Facci sapere cosa pensi del nostro lavoro!</p>
                    <form className='flex flex-col sm:flex-row' onSubmit={submitFeedback}>
                        <input className='w-full p-2 mr-4 rounded-md mb-2 text-gray-600' required type='text' placeholder='Scrivi qui' value={feedBack} onChange={(e) => setFeedBack(e.target.value)}/>
                        <button className='p-2 mb-2 bg-[#00B86E] px-4'>Invia</button>
                    </form>
                </div>
            </div>

        </div>

        <div className='flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-700 items-center'>
            <p className='pt-4 sm:mr-48'>2023 Showcase Mantova. Tutti i diritti riservati</p>
            <Link to='/privacy' className='hover:underline pt-4'>Privacy Policy</Link>
            <Link to='/refund' className='hover:underline pt-4'>Refund Policy</Link>
            <Link to='/legal' className='hover:underline pt-4'>Termini legali</Link>
            <Link to='/support' className='hover:underline pt-4'>Customer Support Policy</Link>
        </div>
    </div>
}

export default Footer
