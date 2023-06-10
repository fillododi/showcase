import React from "react";
import {FaInstagram} from "react-icons/fa";
import {Link} from "react-router-dom";

const ClientList = ({clients}) => {
    return <div className='w-full bg-[#f9f9f9] py-[50px]'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='px-4 pt-4 pb-8 text-center'>
                <p className='text-5xl'>I Nostri Clienti</p>
            </div>
            <div className='grid grid-cols-3 gap-8 text-black'>
                {
                    clients.data &&
                    clients.data.map(client => <div className='items-center flex flex-col'>
                        <Link to={`/gallery#client${client.id}`}><img src={`http://localhost:1337${client.attributes.logo.data.attributes.url}`} className='w-full object-contain'/></Link>
                        <Link to={client.attributes.link_insta? client.attributes.link_insta: "#"} className='w-full my-2 mx-4'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full'>
                                Guarda su Instagram
                            </button>
                        </Link>
                    </div>)
                }
            </div>
        </div>
    </div>
}

export default ClientList