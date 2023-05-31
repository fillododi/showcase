import React from "react";

const Gallery = ({posts}) => {
    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='px-4 pt-4 pb-8 text-center'>
                <p className='text-5xl'>Galleria</p>
            </div>
            <div className='grid grid-cols-1 gap-8 text-black'>
                {posts.data.map(post => (
                    <div key={post.id}>
                        <h3 className='font-bold text-2xl my-1'>{post.attributes.titolo}</h3>
                        <div className='flex gap-12 px-4 items-center'>
                            {/* Render images */}
                            {post.attributes.immagini.data.map(img => (
                                <div className='flex flex-col h-48 px-10'>
                                    <img src={`http://localhost:1337${img.attributes.url}`} className='h-full object-cover'/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>
}
export default Gallery