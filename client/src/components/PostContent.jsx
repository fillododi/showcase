import React from "react";
import {useParams} from "react-router-dom";
import {ReactMarkdown} from "react-markdown/lib/react-markdown"
import {Carousel, IconButton} from "@material-tailwind/react";
import checkMediaType from "../utils/mediatypes.jsx";
import {FaChevronRight, FaChevronLeft} from "react-icons/all.js";
import {IconBase} from "react-icons";

const PostContent = ({posts}) => {
    const {id} = useParams()
    let post = posts.data.filter(post=>post.id==id)
    post = post[0]
    let imagesURLs = post.attributes.immagini.data.map(img=>`http://localhost:1337${img.attributes.url}`)


    return <div className='w-full pb-10 bg-[#f9f9f9]'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='gap-x-8 gap-y-8 px-4 sm:pt-20 md:mt-0  ss:pt-20 text-black'>
                <div className='col-span-2 gap-x-8'>
                    <h1 className='text-4xl my-8 pt-5 text-center'>{post.attributes.titolo}</h1>
                    <Carousel
                        className='rounded-xl'
                        prevArrow={({handlePrev})=>(<div className='!absolute top-2/4 -translate-y-2/4 left-4 flex h-48 items-center'>
                            <IconButton onClick={handlePrev} className='text-3xl border-0 text-gray-900 bg-transparent hover:scale-110 hover:text-black hover:bg-transparent shadow-none hover:shadow-none'>
                                <FaChevronLeft/>
                            </IconButton>
                        </div>)}
                        nextArrow={({handleNext})=>(<div className= '!absolute top-2/4 -translate-y-2/4 right-4 flex h-48 items-center'>
                            <IconButton onClick={handleNext} className='text-3xl border-0 text-gray-900 bg-transparent hover:scale-110 hover:text-black hover:bg-transparent shadow-none hover:shadow-none'>
                                <FaChevronRight/>
                            </IconButton>
                        </div>)}
                    >
                        {imagesURLs.map((url)=>{
                            if(checkMediaType(url) === "image"){
                                return <img className='w-full h-[48rem] object-cover' src={url}/>
                            }
                            if(checkMediaType(url)[0] === "video"){
                                return <video controls className='w-full h-[48rem] object-cover'>
                                    <source src={url}  type={`video/${checkMediaType(url)[1]}`}/>
                                </video>
                            }
                        })}
                    </Carousel>
                    <div className='pt-5 text-center'><ReactMarkdown className='line-break'>{post.attributes.testo}</ReactMarkdown></div>
                </div>
            </div>
        </div>
    </div>
}

export default PostContent