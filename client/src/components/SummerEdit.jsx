import React, {useRef} from "react";
import {summereditthumbnail, pacchetto50, pacchetto80, sfondosummeredit} from '../assets/index'
import {Link} from "react-router-dom"
import './SummerEdit/styles.css'

const SummerEdit = () => {

    const ref = useRef(null)

    const handleScroll = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }

    return <div className="w-full">
        <div className='video-container overflow-hidden'>
            <video autoPlay muted loop src={sfondosummeredit} className='video-sfondo'></video>
        </div>
        <div className=' mx-auto  pb-[50px]'>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 gap-x-8  text-black flex'>
                <div className='col-span-4 gap-x-8 h-[900px]'>
                    <video src={summereditthumbnail} loop autoPlay muted className='h-full w-full object-cover'></video>
                    <button onClick={handleScroll} id="overlay-button" className='font-semibold py-2 px-4 rounded-4xl hover:bg-white'>
                        Vedi Pacchetti
                    </button>
                </div>
                <div className='col-span-4 flex flex-row mb-64' ref={ref}>
                    <div className='w-[50%] py-8 flex flex-col justify-center items-center'>
                        <img src={pacchetto50} className='w-[50%]'/>
                        <p className='text-xl'>Edit Video</p>
                        <p className='text-3xl mt-2'>50€</p>
                        <p className='text-xl mt-2'>Comprende 1 video e 1 traccia audio</p>
                        <Link to={`/purchasesummeredit/50`}>
                            <button className='mt-6 rounded-xl hover:bg-white py-2 px-4'>Acquista Pacchetto</button>
                        </Link>
                    </div>
                    <div className='w-[50%] py-8 flex flex-col justify-center items-center'>
                        <img src={pacchetto80} className='w-[50%]'/>
                        <p className='text-xl'>Edit Video + Foto</p>
                        <p className='text-3xl mt-2'>80€</p>
                        <p className='text-xl mt-2'>Comprende 1 video, fino a 8 foto e 1 traccia audio</p>
                        <Link to={`/purchasesummeredit/80`}>
                            <button className='mt-6 rounded-xl hover:bg-white py-2 px-4'>Acquista Pacchetto</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SummerEdit