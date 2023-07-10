import React, {useState} from "react";
import axios from "axios";

import {Link} from "react-router-dom"
import {FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaEdge, FaEnvelope} from "react-icons/fa";


const Footer = () => {
    const [email, setEmail] = useState('')
    const [feedBack, setFeedBack] = useState('')
    const newsletterSignup = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:1337/api/newsletters', {data: {email}})
            setEmail('')
        } catch (e) {
            console.error(e)
        }

    }

    const submitFeedback = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:1337/api/feedbacks', {data: {feedback: feedBack}})
            setFeedBack('')
        } catch (e) {
            console.error(e)
        }
    }

    return <div className='w-full bg-[#02049A] text-gray-300 py-4 px-2'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-2'>
            <div className='col-span-2 flex flex-col gap-y-2 text-2xl'>
                <div className='pt-1'>
                    <p>Contattaci</p>
                    <div className='flex flex-col text-center m-2 text-lg gap-y-2'>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <FaWhatsapp/>
                            <Link to={'https://wa.me/message/M4W72FLVTQYLN1'}>+393519009424</Link>
                        </div>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <FaEnvelope/>
                            <Link to={'mailto:showcasemantova@gmail.com'}>showcasemantova@gmail.com</Link>
                        </div>
                    </div>
                </div>
                <div className='pt-1'>
                    <p>Dove siamo</p>
                    <div className='text-lg'>
                        <p className='px-4 pt-2 pb-1'>Via Teatro Vecchio, 12</p>
                        <p className='px-4'>Mantova 46100</p>
                    </div>
                </div>
                <div className='text-lg py-2'><Link to='/legal'>Termini legali</Link></div>
            </div>
            <div className='col-span-2 flex flex-col gap-y-10 text-2xl mt-5'>
                <div className='flex flex-row gap-x-3'>
                    <FaFacebook/>
                    <Link to={'https://www.facebook.com/profile.php?id=100090278966698'} className='text-lg'>Showcase Mantova</Link>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <FaInstagram/>
                    <Link to={'https://instagram.com/showcasemantova?igshid=MzRlODBiNWFlZA=='} className='text-lg'>@showcasemantova</Link>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <FaTiktok/>
                    <Link to={'https://www.tiktok.com/@showcasemantova?_t=8cMnmadxlmd&_r=1'} className='text-lg'>@showcasemantova</Link>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <FaYoutube/>
                    <Link to={'https://youtube.com/@ShowCaseMantova'} className='text-lg'>@ShowCaseMantova</Link>
                </div>
            </div>

            <div className='col-span-2 flex flex-col gap-y-4'>
                <div>
                    <p className='font-bold uppercase'>Iscriviti alla Newsletter</p>
                    <p className='py-4'>Riceverai notizie, promozioni e novità da Showcase</p>
                    <form className='flex flex-col sm:flex-row' onSubmit={newsletterSignup}>
                        <input className='w-full p-2 mr-4 rounded-md mb-2 text-gray-600' type='email' placeholder='Inserisci la tua E-Mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button className='p-2 mb-2 bg-[#00B86E]'>Iscriviti</button>
                    </form>
                </div>
                <div>
                    <p className='font-bold uppercase'>Inviaci un Feedback</p>
                    <p className='py-4'>Facci sapere cosa pensi del nostro lavoro!</p>
                    <form className='flex flex-col sm:flex-row' onSubmit={submitFeedback}>
                        <input className='w-full p-2 mr-4 rounded-md mb-2 text-gray-600' type='text' placeholder='Scrivi qui' value={feedBack} onChange={(e) => setFeedBack(e.target.value)}/>
                        <button className='p-2 mb-2 bg-[#00B86E] px-4'>Invia</button>
                    </form>
                </div>
            </div>

        </div>

        <div className='flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center'>
            <p className='pt-4'>2023 Showcase Mantova. Tutti i diritti riservati</p>
        </div>
    </div>
}

export default Footer