import React from "react";
import {useParams} from "react-router-dom";
import {ReactMarkdown} from "react-markdown/lib/react-markdown"
import {Link} from 'react-router-dom'
import checkMediaType from "../utils/mediatypes.jsx";

const PostContent = ({posts}) => {
    const {id} = useParams()
    let post = posts.data.filter(post=>post.id==id)
    post = post[0]
    let imagesURLs = post.attributes.immagini.data.map(img=>`http://localhost:1337${img.attributes.url}`)


    return <div className='w-full pb-10 bg-[#f9f9f9]'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 gap-x-8 gap-y-8 px-4 sm:pt-20 md:mt-0  ss:pt-20 text-black'>
                <div className='col-span-2 gap-x-8 gap-y-8'>
                    <img className='h-56 w-full object-cover' src={`http://localhost:1337${post.attributes.immagini.data[0].attributes.url}`}/>
                    <h1 className='font-bold text-2xl my-1 pt-5'>{post.attributes.titolo}</h1>
                    <div className='pt-5'><ReactMarkdown className='line-break'>{post.attributes.testo}</ReactMarkdown></div>
                    <Link to={`/gallery#client${post.attributes.clienti.data.id}`}><p>Vai al collaboratore</p></Link>
                </div>

                <div className='w-full grid overflow-hidden gap-y-8 grid-cols-1 col-span-2 md:col-span-1'>
                    {imagesURLs.map((url)=>{
                            if(checkMediaType(url) === "image"){
                                return <img className='w-full h-full object-cover mx-auto my-0 drop-shadow-md rounded-xl' src={url}/>
                            }
                            if(checkMediaType(url)[0] === "video"){
                                return <video controls className='w-full h-full object-cover mx-auto my-0 drop-shadow-md rounded-xl'>
                                    <source src={url}  type={`video/${checkMediaType(url)[1]}`}/>
                                </video>
                            }
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default PostContent