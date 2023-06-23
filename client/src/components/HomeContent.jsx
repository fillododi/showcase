import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom";
import {logo} from "../assets/index.js";
import {videosummeredit} from '../assets/index.js'
import './HomeContent/styles.css'

const HomeContent = ({posts})=> {

    const [logoScale, setLogoScale] = useState(1)
    const [textTranslation, setTextTranslation] = useState(0)
    const [showButton, setShowButton] = useState(false)

    useEffect(()=>{
        const video = document.getElementById('videosummeredit')
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const scaleFactor = Math.max(1-scrollPosition*0.0015, 0.2)
            const translationValue = Math.max(0, (scrollPosition - 350)*5)
            setLogoScale(scaleFactor)
            setTextTranslation(translationValue)
        }
        window.addEventListener('scroll', handleScroll)

        const handleVideoTimeUpdate = () => {
            if(video.currentTime >= 1.5){
                setShowButton(true)
            }
        }
        video.addEventListener('timeupdate', handleVideoTimeUpdate)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            video.removeEventListener('timeupdate', handleVideoTimeUpdate)
        }
    },[])

    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='logo-container flex justify-center'>
                <img src={logo} alt='logo' id='logo'
                     className='sm:ml-10 ss:ml-10 md:ml-3 w-[70%] h-full my-[100px]'
                     style={{transform: `scale(${logoScale})`}}
                />
            </div>

            <div className='px-4 pt-4 pb-8 my-[10px] text-center text-container'>
                <p style={{transform: `translateX(${textTranslation}px)`}}>
                    Benvenuti nel nostro mondo di videomaker e fotografia! Siamo un team appassionato di giovani talenti con oltre 6 anni di esperienza nel settore. La nostra mission è semplice: rendere accessibile a tutte le attività la possibilità di avere contenuti professionali e curati per le loro pagine social. Trasforma la tua presenza online in un vero spettacolo visivo con la creatività e la competenza di Showcase!
                </p>
            </div>
            <div className='mt-[10px] mb-[100px] flex justify-center video-container'>
                <video src={videosummeredit} id='videosummeredit' autoPlay loop className={`rounded-2xl drop-shadow-3xl`}></video>
                <Link to={'/summeredit'}><button id='summereditbutton' className={`overlay-button ${showButton? 'show': ''}`}>Scopri di più</button></Link>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 gap-8 px-4 text-black'>
                {posts.data.map((post)=>
                    <Link to={`/post/${post.id}`}>
                        <div className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
                            <img className='h-56 w-full object-cover' src={`http://localhost:1337${post.attributes.immagini.data[0].attributes.url}`}/>
                            <div className='p-8'>
                                <h3 className='font-bold text-2xl my-1'>{post.attributes.titolo}</h3>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    </div>
}

export default HomeContent