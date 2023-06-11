import React from "react";
import {useEffect} from "react";
import checkMediaType from "../utils/mediatypes.jsx";

const Gallery = ({clients}) => {
    useEffect(()=> {
        if(window.location.hash){
            const targetClient = document.querySelector(window.location.hash)
            if(targetClient){
                targetClient.scrollIntoView({behavior: "smooth"})
            }
        }
    }, [])

    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='px-4 pt-4 pb-8 text-center'>
                <p className='text-5xl'>Galleria</p>
            </div>
            <div className='grid grid-cols-1 gap-8 text-black'>
                {
                    clients.data &&
                    clients.data.map(client => <div id={`client${client.id}`}>
                        <h3 className='font-bold text-2xl my-1'>{client.attributes.nome}</h3>
                        <div className='flex gap-12 px-4 items-center'>
                            {client.attributes.posts.data.map(post => (
                                post.attributes.immagini.data.map(img => {
                                    if(checkMediaType(img.attributes.url) === "image"){
                                        return <div className='flex flex-col h-48 px-10'>
                                            <img src={`http://localhost:1337${img.attributes.url}`} className='h-full object-contain'/>
                                        </div>
                                    }
                                    else if(checkMediaType(img.attributes.url)[0] === "video"){
                                        return <div className='flex flex-col h-48 px-10'>
                                            <video controls className='h-full object-contain'>
                                                <source src={`http://localhost:1337${img.attributes.url}`} type={`video/${checkMediaType(img.attributes.url)[1]}`}/>
                                            </video>
                                        </div>
                                    }
                                })
                            ))}
                        </div>
                    </div>)
                }
            </div>
        </div>

    </div>
}
export default Gallery