import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import checkMediaType from "../utils/mediatypes.jsx";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import './MultipleSlider/styles.css'

const MultipleSlider = ({urls, imageNumber}) => {
    console.log(imageNumber)
    let settings = {}
    const stopAllVideos = () => {
        const videoList = document.getElementsByTagName("video")
        for(const video of videoList){
            video.pause()
        }
    }
    const handlePlayVideo = (video) => {
        const videoList = document.getElementsByTagName("video")
        for(const vid of videoList){
            if(vid != video){
                vid.pause()
            }
        }
        video.play()
    }

    if(urls.length >= imageNumber){
        settings = {
            initialSlide: 0,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: imageNumber,
            slidesToScroll: 1,
            prevArrow: <div className='flex h-48 items-center'>
                <button onClick={stopAllVideos} className='text-xl border-0 text-gray-800 bg-[#eee] hover:scale-110 hover:text-black hover:[#f9f0c4]'>
                    <FaChevronLeft/>
                </button>
            </div>,
            nextArrow: <div className= 'flex h-48 items-center'>
                <button onClick={stopAllVideos} className='text-xl border-0 text-gray-800 bg-[#eee] hover:scale-110 hover:text-black hover:[#f9f0c4]'>
                    <FaChevronRight/>
                </button>
            </div>

        }
    } else {
        settings = {
            initialSlide: 0,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: imageNumber,
            slidesToScroll: 1,
            prevArrow: <div className='flex h-48 items-center'>
                <button onClick={stopAllVideos} className='text-xl border-0 text-gray-800 bg-[#eee] hover:scale-110 hover:text-black hover:bg-[#f9f0c4]'>
                    <FaChevronLeft/>
                </button>
            </div>,
            nextArrow: <div className= 'flex h-48 items-center'>
                <button onClick={stopAllVideos} className='text-xl border-0 text-gray-800 bg-[#eee] hover:scale-110 hover:text-black hover:bg-[#f9f0c4]'>
                    <FaChevronRight/>
                </button>
            </div>

        }
    }





    return <div>
        <Slider {...settings}>
            {urls.map(url => <div>
                {checkMediaType(url) === "image" && <img className='mx-auto h-48' src={`${url.replace("showcase-static.s3.eu-south-1.amazonaws.com","d2r33wic133snl.cloudfront.net")}`}/>}
                {checkMediaType(url)[0] === "video" && <video controls preload='auto' className='mx-auto h-48' onPlay={(e) => handlePlayVideo(e)}>
                    <source src={`${url.replace("showcase-static.s3.eu-south-1.amazonaws.com","d2r33wic133snl.cloudfront.net")}`} type={`video/${checkMediaType(url)[1]}`}/>
                </video>}
            </div>)}
        </Slider>
    </div>
}

export default MultipleSlider
