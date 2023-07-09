import React, {useState} from "react";
import {useEffect} from "react";
import {FaChevronUp, FaChevronDown} from "react-icons/all.js";
import MultipleSlider from "./MultipleSlider.jsx";

import './Gallery/styles.css'

const Gallery = ({clients}) => {
    const [openRow, setOpenRow] = useState(null)
    const [currentMedia, setCurrentMedia] = useState([])

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

    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='px-4 pt-4 pb-24 text-center'>
                <p className='text-5xl'>Galleria</p>
            </div>
            <div className='flex flex-col gap-y-16'>
                {
                    clients.data &&
                    clients.data.map(client =>
                            <div className='flex flex-col mx-24 gap-y-8'>
                                <div className='grid grid-cols-9 h-48'>
                                    <img className='h-full col-span-3' src={`http://localhost:1337${client.attributes.posts.data[0]? client.attributes.posts.data[0].attributes.immagini.data[0].attributes.url: ""}`}/>
                                    <div className='col-span-6 flex flex-row'>
                                        <p className='text-4xl my-auto text-gray-800 text-left'>
                                            {client.attributes.nome}
                                        </p>
                                        <button className='align-middle mx-12 text-2xl border-0 text-gray-800 rounded-l hover:text-black' type="button" onClick={()=>handleDropDownChange(client)}>{openRow && openRow === client.id? <FaChevronUp/> : <FaChevronDown/>}</button>
                                    </div>
                                </div>
                                <div id='row' className={openRow === client.id? 'openedRow': ''}>
                                    <MultipleSlider urls={currentMedia}></MultipleSlider>
                                </div>
                                <hr className='border-gray-400 mt-4'/>
                            </div>
                    )
                }
            </div>
        </div>

    </div>
}
export default Gallery