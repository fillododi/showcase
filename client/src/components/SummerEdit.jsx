import React, {useRef} from "react";
import {/*summereditthumbnail,*/ pacchetto50, pacchetto80,/* sfondosummeredit,*/ postersummereditthumbnail, postersfondosummeredit} from '../assets/index'
import {Link} from "react-router-dom"
import './SummerEdit/styles.css'

const SummerEdit = () => {

    const ref = useRef(null)

    const handleScroll = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }

    return <div className='mt-[80px] '>
        <div className='relative flex justify-center overflow-hidden'>
            {navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0?
                <img src='https://d2r33wic133snl.cloudfront.net/summereditthumbnail.mp4' className='h-screen md:h-auto md:w-auto md:min-w-full md:min-h-full max-w-none'/>
                :
                <video poster={postersummereditthumbnail} preload="auto"  playsInline loop autoPlay muted className='h-screen md:h-auto md:w-auto md:min-w-full md:min-h-full max-w-none'>
                    <source src='https://d2r33wic133snl.cloudfront.net/summereditthumbnail.mp4'/*{summereditthumbnail}*/ type='video/mp4'></source>
                    <source src='https://d2r33wic133snl.cloudfront.net/summereditthumbnail.mov'/*{summereditthumbnail}*/ type='video/mov'></source>
                    <source src='https://d2r33wic133snl.cloudfront.net/summereditthumbnail.webm'/*{summereditthumbnail}*/ type='video/webm'></source>
                </video>
            }
            <button className='absolute py-2 px-4 rounded-4xl hover:bg-white top-[70%] mx-auto z-10 text-xs xs:text-sm sm:text-base ' onClick={handleScroll}>Vedi Pacchetti</button>
        </div>
        <div className='relative flex justify-center overflow-hidden'>
            {navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0?
                <img ref={ref} src='https://d2r33wic133snl.cloudfront.net/sfondosummeredit.mp4' className='h-screen sm:h-auto sm:w-auto sm:min-w-full sm:min-h-full max-w-none'/>
                :
                <video ref={ref} poster={postersfondosummeredit} preload="auto"  playsInline loop autoPlay muted className='h-screen sm:h-auto sm:w-auto sm:min-w-full sm:min-h-full max-w-none'>
                    <source src='https://d2r33wic133snl.cloudfront.net/sfondosummeredit.mp4'/*{sfondosummeredit}*/ type='video/mp4'></source>
                    <source src='https://d2r33wic133snl.cloudfront.net/sfondosummeredit.mov'/*{sfondosummeredit}*/ type='video/mov'></source>
                    <source src='https://d2r33wic133snl.cloudfront.net/sfondosummeredit.webm'/*{sfondosummeredit}*/ type='video/webm'></source>
                </video>
            }
            <div className='absolute z-10 pt-16 md:pt-20 sm:pt-0'>
                <div className='col-span-4 flex flex-col sm:flex-row gap-x-2 mb-64 justify-evenly gap-y-8 items-center'>
                    <div className='w-[40%] flex flex-col justify-evenly items-center gap-y-4 lg:gap-y-8'>
                        <img src={pacchetto50} className='w-[50%]'/>
                        <p className='text-sm sm:text-base md:text-xl text-center font-semibold' style={{fontFamily: 'Montserrat'}}>Edit Video</p>
                        <p className='text-sm sm:text-lg md:text-3xl text-center font-semibold' style={{fontFamily: 'Montserrat'}}>50€</p>
                        <p className='text-sm sm:text-base md:text-xl text-center font-semibold' style={{fontFamily: 'Montserrat'}}>Comprende 1 video e 1 traccia audio</p>
                        <Link to={`/purchasesummeredit/50`}>
                            <button className='rounded-xl hover:bg-white py-2 px-4 text-xs xs:text-sm sm:text-base'>Acquista Pacchetto</button>
                        </Link>
                    </div>
                    <div className='w-[40%] flex flex-col justify-evenly items-center gap-y-4 lg:gap-y-8'>
                        <img src={pacchetto80} className='w-[50%]'/>
                        <p className='text-sm sm:text-base md:text-xl text-center font-semibold' style={{fontFamily: 'Montserrat'}}>Edit Video + Foto</p>
                        <p className='text-sm sm:text-lg md:text-3xl text-center font-semibold' style={{fontFamily: 'Montserrat'}}>80€</p>
                        <p className='text-sm sm:text-base md:text-xl text-center font-semibold' style={{fontFamily: 'Montserrat'}}>Comprende 1 video, fino a 8 foto e 1 traccia audio</p>
                        <Link to={`/purchasesummeredit/80`}>
                            <button className='rounded-xl hover:bg-white py-2 px-4 text-xs xs:text-sm sm:text-base'>Acquista Pacchetto</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

        {/*
        <div className='video-container h-[900px] overflow-hidden'>
            <video autoPlay muted loop src={sfondosummeredit} className='video-sfondo'></video>
        </div>
        <div className=' mx-auto pb-[50px]'>
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
        </div>*/}
}

export default SummerEdit
