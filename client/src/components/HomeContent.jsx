import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom";
import {logo} from "../assets/index.js";
import {videosummeredit} from '../assets/index.js'
import './HomeContent/styles.css'

const HomeContent = ({posts, clients})=> {

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
            <div className='my-[50px]'>
                <h3 className='text-4xl text-center my-5'>I Nostri Collaboratori</h3>
                <div className='grid grid-cols-5 gap-x-8 gap-y-8'>
                    {
                        clients.data &&
                        clients.data.map(client => <div className='items-center flex flex-col'>
                            <Link to={client.attributes.link_insta? client.attributes.link_insta: "#"} className='items-center w-[75%]'>
                                <img src={`http://localhost:1337${client.attributes.logo.data.attributes.url}`} className='object-contain rounded-full hover:scale-110 hover:drop-shadow-xl duration-300'/>
                                <p className='text-center text-lg'>{client.attributes.nome? client.attributes.nome: ""}</p>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
            <div className='my-8'>
                <h3 className='text-4xl text-center my-8'>I Nostri Lavori</h3>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 gap-8 px-4 text-black'>
                    {posts.data.slice(0).reverse().map((post)=>
                        <div className='items-center'>
                            <div className='w-80 bg-white drop-shadow-md rounded-full items-center hover:scale-110 hover:drop-shadow-xl duration-300'>
                                <Link to={`/post/${post.id}`} className='items-center'>
                                    <img className='w-full rounded-full object-cover aspect-square' src={`http://localhost:1337${post.attributes.immagini.data[0].attributes.url}`}/>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}

export default HomeContent