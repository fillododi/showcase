import React, {useState} from "react";
import {useEffect} from "react";
import checkMediaType from "../utils/mediatypes.jsx";
import {FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight} from "react-icons/all.js";

import './Gallery/styles.css'

const Gallery = ({clients}) => {
    const [openRow, setOpenRow] = useState(null)
    const [currentMedia, setCurrentMedia] = useState([])
    const [slidePosition, setSlidePosition] = useState(0)

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
            setSlidePosition(0)
            let newMedia = []
            client.attributes.posts.data.forEach(post =>
                post.attributes.immagini.data.forEach(
                    (img)=>newMedia.push(img.attributes.url)
                )
            )
            setCurrentMedia(newMedia)
        }
    }
    const handleSlideChange = (direction) => {
        if(direction === "r"){
            setSlidePosition(slidePosition+1)
        }
        if(direction === "l"){
            setSlidePosition(slidePosition-1)
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
                                        <div className='h-48 flex flex-row justify-between'>
                                            <div className= 'flex h-48 items-center'>
                                                <button className={slidePosition == 0 ? 'invisible': 'visible text-xl border-0 text-gray-800 bg-white hover:scale-110 hover:text-black hover:bg-white'} onClick={()=>handleSlideChange('l')}>
                                                    <FaChevronLeft/>
                                                </button>
                                            </div>
                                            <div className='flex flex-row gap-x-16'>
                                                <div className='h-48'>
                                                    {
                                                        currentMedia[slidePosition] &&
                                                        (checkMediaType(currentMedia[slidePosition]) === "image"?
                                                                <img className='h-full' src={`http://localhost:1337${currentMedia[slidePosition]}`}/>:
                                                                <video controls className='h-full object-contain'>
                                                                    <source src={`http://localhost:1337${currentMedia[slidePosition]}`} type={`video/${checkMediaType(currentMedia[slidePosition])[1]}`}/>
                                                                </video>
                                                        )
                                                    }
                                                </div>
                                                <div className='h-48'>
                                                    {
                                                        currentMedia[slidePosition + 1] &&
                                                        (checkMediaType(currentMedia[slidePosition + 1]) === "image"?
                                                            <img className='h-full' src={`http://localhost:1337${currentMedia[slidePosition + 1]}`}/>:
                                                            <video controls className='h-full object-contain'>
                                                                <source src={`http://localhost:1337${currentMedia[slidePosition + 1]}`} type={`video/${checkMediaType(currentMedia[slidePosition + 1])[1]}`}/>
                                                            </video>)
                                                    }
                                                </div>
                                                <div className='h-48'>
                                                    {
                                                        currentMedia[slidePosition + 2] &&
                                                        (checkMediaType(currentMedia[slidePosition + 2]) === "image"?
                                                            <img className='h-full' src={`http://localhost:1337${currentMedia[slidePosition + 2]}`}/>:
                                                            <video controls className='object-contain h-full'>
                                                                <source src={`http://localhost:1337${currentMedia[slidePosition + 2]}`} type={`video/${checkMediaType(currentMedia[slidePosition + 2])[1]}`}/>
                                                            </video>)
                                                    }
                                                </div>
                                                <div className='h-48'>
                                                    {
                                                        currentMedia[slidePosition + 3] &&
                                                        (checkMediaType(currentMedia[slidePosition + 3]) === "image"?
                                                            <img className='h-full' src={`http://localhost:1337${currentMedia[slidePosition + 3]}`}/>:
                                                            <video controls className='object-contain h-full'>
                                                                <source src={`http://localhost:1337${currentMedia[slidePosition + 3]}`} type={`video/${checkMediaType(currentMedia[slidePosition + 3])[1]}`}/>
                                                            </video>)
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex items-center h-48'>
                                                <button className={slidePosition >= currentMedia.length - 4 ? 'invisible': 'visible text-xl border-0 text-gray-800 bg-white hover:scale-110 hover:text-black hover:bg-white'} onClick={()=>handleSlideChange('r')}>
                                                    <FaChevronRight/>
                                                </button>
                                            </div>
                                        </div>
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