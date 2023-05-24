import React from "react";
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom";
import {logo} from "../assets/index.js";

const HomeContent = ({posts})=> {

    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <Link to={'/'}><img src={logo} alt='logo' className='sm:ml-10 ss:ml-10 md:ml-3 hover:opacity-[55%] w-full h-full'/></Link>
            <div className='px-4 pt-4 pb-8 text-center'>
                <p>Benvenuti nel nostro mondo di videomaker e fotografia! Siamo un team appassionato di giovani talenti con oltre 6 anni di esperienza nel settore. La nostra mission è semplice: rendere accessibile a tutte le attività la possibilità di avere contenuti professionali e curati per le loro pagine social. Trasforma la tua presenza online in un vero spettacolo visivo con la creatività e la competenza di Showcase!</p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ss:grid-cols-1 gap-8 px-4 text-black'>
                {posts.data.map((post)=>
                    <Link to={`/post/${post.id}`}>
                        <div className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
                            <img className='h-56 w-full object-cover' src={`http://localhost:1337${post.attributes.immagini.data[0].attributes.url}`}/>
                            <div className='p-8'>
                                <h3 className='font-bold text-2xl my-1'>{post.attributes.titolo}</h3>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    </div>
}

export default HomeContent