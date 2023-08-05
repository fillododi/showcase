import React from "react";
import {useParams} from "react-router-dom";
import {ReactMarkdown} from "react-markdown/lib/react-markdown"
import {Carousel, IconButton} from "@material-tailwind/react";
import checkMediaType from "../utils/mediatypes.jsx";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa";
import useWindowDimensions from "../hooks/useWindowDimensions.js";

const PostContent = ({posts}) => {
    const {width, height} = useWindowDimensions()
    const {id} = useParams()
    let post = posts.data.filter(post=>post.id==id)
    post = post[0]
    let imagesURLs = post.attributes.immagini.data.map(img=>`${img.attributes.url}`)


    return <div className='w-full pb-10  mt-[80px]'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='gap-x-8 gap-y-8 px-4 pt-20 text-black'>
                <div className='col-span-2 gap-x-8 flex flex-col items-center'>
                    <h1 className='text-4xl mt-2 mb-8 text-center text-bold' style={{fontFamily: 'Montserrat'}}>{post.attributes.titolo}</h1>
                    {width >= 1024?
                        <>
                        <Carousel
                            className='rounded-xl w-[50%] h-[50%]'
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
                                    return <img className='w-full object-cover h-[24rem]' src={url}/>
                                }
                                if(checkMediaType(url)[0] === "video"){
                                    return <video controls preload="auto" className='w-full object-cover h-[24rem]' poster={`${post.attributes.thumbnail.data.attributes.url}`}>
                                        <source src={url}  type={`video/${checkMediaType(url)[1]}`}/>
                                    </video>
                                }
                            })}
                        </Carousel>
                        <div className='pt-5 text-center text-xl'><ReactMarkdown className='line-break' style={{fontFamily: 'Montserrat'}}>{post.attributes.testo}</ReactMarkdown></div>
                        </>
                        :
                            imagesURLs.length > 1 ? <>
                                {/*checkMediaType(imagesURLs[1]) === "image"?
                                    <img className='w-full object-cover h-36' src={imagesURLs[1]}/>
                                    :
                                    checkMediaType(imagesURLs[1])[0] === "video"?
                                    <video muted loop autoPlay className='w-full object-cover h-36'>
                                        <source src={imagesURLs[1]} type={`video/${checkMediaType(imagesURLs[1])[1]}`}/>
                                    </video>
                                        :
                                        <></>
                                */}

                                <div className='flex flex-col justify-center gap-y-4'>
                                    {imagesURLs.map((url) => {
                                        if (checkMediaType(url) === "image") {
                                            return <img className='w-full object-contain' src={url}/>
                                        }
                                        if (checkMediaType(url)[0] === "video") {
                                            return <video controls preload="auto" className='w-full object-contain' poster={`${post.attributes.thumbnail.data.attributes.url}`}>
                                                <source src={url} type={`video/${checkMediaType(url)[1]}`}/>
                                            </video>
                                        }
                                    })}
                                </div>
                                    <div className='p-5 text-center text-xl'><ReactMarkdown
                                        className='line-break' style={{fontFamily: 'Montserrat'}}>{post.attributes.testo}</ReactMarkdown></div>
                            </>
                                :
                                <>
                                    <div className='flex flex-col justify-center gap-y-4'>
                                        {imagesURLs.map((url) => {
                                            if (checkMediaType(url) === "image") {
                                                return <img className='w-full object-contain' src={url}/>
                                            }
                                            if (checkMediaType(url)[0] === "video") {
                                                return <video controls preload="auto" className='w-full object-contain' poster={`${post.attributes.thumbnail.data.attributes.url}`}>
                                                    <source src={url} type={`video/${checkMediaType(url)[1]}`}/>
                                                </video>
                                            }
                                        })}
                                    </div>
                                    <div className='p-5 text-center text-xl'><ReactMarkdown
                                        className='line-break' style={{fontFamily: 'Montserrat'}}>{post.attributes.testo}</ReactMarkdown></div>
                                </>
                        }
                </div>
            </div>
        </div>
    </div>
}

export default PostContent
