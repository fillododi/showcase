import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import {logo} from "../assets/index.js";
import {/*videosummeredit,*/ postervideosummeredit} from '../assets/index.js'
import './HomeContent/styles.css'
import useWindowDimensions from "../hooks/useWindowDimensions.js";
import checkMediaType from "../utils/mediatypes.jsx";

const HomeContent = ({posts, clients})=> {
    useEffect(()=> {
        window.scrollTo(0,0)
    }, [])

    const [logoScale, setLogoScale] = useState(1)
    const [textTranslation, setTextTranslation] = useState(0)
    const [textScale, setTextScale] = useState(1)
    const [showButton, setShowButton] = useState(false)

    const {width, height} = useWindowDimensions()

    useEffect(()=>{
        const video = document.getElementById('videosummeredit')
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const logoScaleFactor = Math.max(1-scrollPosition*0.0015, 0.2)
            const translationValue = Math.max(0, (scrollPosition - 350)*0.5)
            const textScaleFactor = Math.min(Math.max(1 - ((scrollPosition - 350)*0.001), 0), 1)
            setLogoScale(logoScaleFactor)
            setTextTranslation(translationValue)
            setTextScale(textScaleFactor)
        }
        window.addEventListener('scroll', handleScroll)

        const handleVideoTimeUpdate = () => {
            if(video.currentTime >= 1.5){
                setShowButton(true)
            }
        }
        video.addEventListener('timeupdate', handleVideoTimeUpdate)
	    video.addEventListener("load", ()=>video.play())

        return () => {
            window.removeEventListener('scroll', handleScroll)
            video.removeEventListener('timeupdate', handleVideoTimeUpdate)
        }
    },[])

    return <div className="w-full bg-[#eee] py-[50px] mt-[80px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='logo-container flex justify-center'>
                <img src={logo} alt='logo' id='logo'
                     className='sm:ml-10 ss:ml-10 md:ml-3 w-[85%] xs:w-[70%] h-full my-24'
                     style={{transform: `scale(${logoScale})`}}
                />
            </div>

            <div className='px-4 pt-4 pb-8 my-4 text-center text-container'>
                <p className='text-xs sm:text-sm md:!text-2xl font-bold' style={{transform: `translateY(${textTranslation*(-1)}px) scale(${textScale})`, fontFamily: 'Montserrat'}}>
                    Benvenuti nel nostro mondo di videomaker e fotografia! Siamo un team di giovani appassionati e talentuosi con oltre 6 anni di esperienza nel settore. La nostra missione è semplice: rendere accessibile a tutte le attività la possibilità di avere contenuti professionali e curati per le loro pagine social. Trasforma la tua presenza online in un vero spettacolo visivo con la creatività e la competenza di Showcase!
                </p>
            </div>
            <div className='mt-2.5 mb-28 flex justify-center video-container'>
                {navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0?
                    <img id='videosummeredit' src='https://d2r33wic133snl.cloudfront.net/videosummeredit.mp4' className='sm:rounded-2xl drop-shadow-3xl sm:w-2/3'/>
                    :
                    <video id='videosummeredit' preload="auto" poster={postervideosummeredit} playsInline muted autoPlay loop className={`sm:rounded-2xl drop-shadow-3xl sm:w-2/3`}>
                        <source  src='https://d2r33wic133snl.cloudfront.net/videosummeredit.mp4'/*{videosummeredit}*/ type='video/mp4'></source>
                        <source  src='https://d2r33wic133snl.cloudfront.net/videosummeredit.mov'/*{videosummeredit}*/ type='video/mov'></source>
                        <source  src='https://d2r33wic133snl.cloudfront.net/videosummeredit.webm'/*{videosummeredit}*/ type='video/webm'></source>
                    </video>
                }

                <Link to={'/summeredit'}><button id='summereditbutton' className={`overlay-button text-sm xs:text-base px-2 py-1 xs:px-4 xs:py-2  ${showButton || (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) ? 'show': ''}`}>Scopri di più</button></Link>
            </div>
            <div className='my-[50px]'>
                <h3 className='text-2xl sm:text-4xl text-center my-8'>I Nostri Lavori</h3>
                <div className='grid grid-cols-2 xs:grid-cols-3 gap-8 px-4 text-black'>
                    {posts.data.slice(0).reverse().map((post)=>
                        <div className='flex justify-between flex-col'>
                            <div className='w-full md:w-[80%] bg-white drop-shadow-md rounded-full items-center hover:scale-110 hover:drop-shadow-xl duration-300'>
                                <Link to={`/post/${post.id}`} className='items-center'>
                                    {checkMediaType(post.attributes.immagini.data[0].attributes.url) === "image" ?
                                        <img className='w-full rounded-full object-cover aspect-square' src={`${post.attributes.immagini.data[0].attributes.url}`}/>
                                        :
                                        <video className='w-full rounded-full object-cover aspect-square' src={`${post.attributes.immagini.data[0].attributes.url}`} muted preload="auto"/>
                                    }
                                </Link>
                            </div>
                            <p className='text-center text-base xs:text-lg sm:text-xl'>{post.attributes.titolo? post.attributes.titolo: ""}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='my-8'>
                <h3 className='text-2xl sm:text-4xl text-center my-5'>I Nostri Collaboratori</h3>
                <div className='grid grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-8 pt-8'>
                    {
                        clients.data &&
                        clients.data.map(client => <div className='items-center flex flex-col justify-between'>
                            <Link to={client.attributes.link_insta? client.attributes.link_insta: "#"} className='flex flex-col items-center justify-center w-[75%] gap-y-2'>
                                <img src={`${client.attributes.logo.data.attributes.url}`} className='object-contain rounded-full hover:scale-110 hover:drop-shadow-xl duration-300'/>
                                <p className='text-center text-xs xs:text-base sm:text-lg'>{client.attributes.nome? client.attributes.nome: ""}</p>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </div>
}

export default HomeContent
