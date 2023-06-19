import React from "react";
import {summereditbg, fotosummeredit} from '../assets/index'
import Dropzone from "react-dropzone";

const SummerEdit = () => {
    return <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className='max-w-[1240px] mx-auto'>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 gap-x-8 gap-y-16 px-4 text-black'>
                <div className='col-span-3 gap-x-8'>
                    <video src={summereditbg} loop autoPlay className='h-64 w-full object-cover'></video>
                </div>
                <div className='flex flex-col col-span-1'>
                    <img src={fotosummeredit}/>
                </div>
                <div className='col-span-2 flex flex-col'>
                    <div className='flex-grow'>
                        <p className='mb-4'>TESTO CHE SPIEGA COME FUNZIONA PER BENE LA SUMMEREDIT, GANDO ME LO DEVE INVIARE ASAPPPPPPP</p>
                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({getRootProps, getInputProps})=>(
                                <section>
                                    <div {...getRootProps()} className='my-[10rem] border-dashed border-2 border-gray-300 rounded-md p-4 text-center'>
                                        <input {...getInputProps()}/>
                                        <p>Trascina qui dei file, o clicca per selezionare i file</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SummerEdit