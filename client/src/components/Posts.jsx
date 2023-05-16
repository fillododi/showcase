import React from "react";
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom";

const Posts = ({posts})=> {

    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black'>
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

export default Posts