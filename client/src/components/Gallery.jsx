import React, {useState} from "react";
import {useEffect} from "react";
import {FaChevronUp, FaChevronDown} from "react-icons/all.js";
import MultipleSlider from "./MultipleSlider.jsx";
import useWindowDimensions from "../hooks/useWindowDimensions.js";

import './Gallery/styles.css'

const Gallery = ({clients}) => {
    const [openRow, setOpenRow] = useState(null)
    const [currentMedia, setCurrentMedia] = useState([])

    const {width, height} = useWindowDimensions()

    useEffect(()=> {
        if(window.location.hash){
            const targetClient = document.querySelector(window.location.hash)
            if(targetClient){
                targetClient.scrollIntoView({behavior: "smooth"})
            }
        }
    }, [])
    useEffect(()=>{
        console.log(openRow,currentMedia)
    }, [openRow, currentMedia])

    const handleDropDownChange = (client) => {
        if(openRow === client.id){
            setOpenRow(null)
            setCurrentMedia([])
        } else {
            setOpenRow(client.id)
            let newMedia = []
            client.attributes.posts.data.forEach(post =>
                post.attributes.immagini.data.forEach(
                    (img)=>newMedia.push(img.attributes.url)
                )
            )
            setCurrentMedia(newMedia)
        }
    }

    return <div className="w-full bg-[#f9f0c4] py-[50px] mt-[80px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='px-4 pt-4 pb-24 text-center'>
                <p className='text-5xl'></p>
            </div>
            <div className='flex flex-col gap-y-16'>
                {
                    clients.data &&
                    clients.data.map(client =>
                            <div className='flex flex-col mx-12 sm:mx-24 gap-y-12'>
                                <div className='flex flex-col md:flex-row gap-y-4 my-auto justify-stretch h-48 px-12 mb-4 md:m-0'>
                                    <div className='h-48 md:w-1/2 flex items-center justify-center'>
                                        <img className='col-span-3 rounded-full w-36 h-36 xs:w-48 xs:h-48 object-cover'
                                             src={`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_STRAPI_PORT}${client.attributes.logo.data? client.attributes.logo.data.attributes.url: ""}`}/>
                                    </div>
                                    <div className='gap-x-8 flex flex-row md:w-1/2 justify-center md:justify-end'>
                                        <p className='md:text-4xl ml-4 md:ml-0 md:text-right text-3xl my-auto text-gray-800t'>
                                            {client.attributes.nome}
                                        </p>
                                        <button className='md:mx-12 text-2xl border-0 text-gray-800 rounded-l hover:text-black' type="button" onClick={()=>handleDropDownChange(client)}>{openRow && openRow === client.id? <FaChevronUp/> : <FaChevronDown/>}</button>
                                    </div>
                                </div>
                                <div id='row' className={openRow === client.id? 'openedRow mb-4 mt-8 md:mt-4': ''}>
                                    <MultipleSlider imageNumber={width<768? 1: width<1024? 2: 3} urls={currentMedia}></MultipleSlider>
                                </div>
                                <hr className='border-gray-400 mt-4 md:m-0'/>
                            </div>
                    )
                }
            </div>
        </div>

    </div>
}
export default Gallery