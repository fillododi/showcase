import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import checkMediaType from "../utils/mediatypes.jsx";
import {FaChevronLeft, FaChevronRight} from "react-icons/all.js";

const MultipleSlider = (urls) => {
    let settings = {}
    if(urls.urls.length >= 3){
        settings = {
            initialSlide: 0,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: <div className='flex h-48 items-center'>
                <button className='text-xl border-0 text-gray-800 bg-white hover:scale-110 hover:text-black hover:bg-white'>
                    <FaChevronLeft/>
                </button>
            </div>,
            nextArrow: <div className= 'flex h-48 items-center'>
                <button className='text-xl border-0 text-gray-800 bg-white hover:scale-110 hover:text-black hover:bg-white'>
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
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: <div className='flex h-48 items-center'>
                <button className='text-xl border-0 text-gray-800 bg-white hover:scale-110 hover:text-black hover:bg-white'>
                    <FaChevronLeft/>
                </button>
            </div>,
            nextArrow: <div className= 'flex h-48 items-center'>
                <button className='text-xl border-0 text-gray-800 bg-white hover:scale-110 hover:text-black hover:bg-white'>
                    <FaChevronRight/>
                </button>
            </div>

        }
    }
    return <div>
        <Slider {...settings}>
            {urls.urls.map(url => <div>
                {checkMediaType(url) === "image" && <img className='mx-auto h-48' src={`http://localhost:1337${url}`}/>}
                {checkMediaType(url)[0] === "video" && <video controls className='mx-auto h-48'>
                    <source src={`http://localhost:1337${url}`} type={`video/${checkMediaType(url)[1]}`}/>
                </video>}
            </div>)}
        </Slider>
    </div>
}

export default MultipleSlider