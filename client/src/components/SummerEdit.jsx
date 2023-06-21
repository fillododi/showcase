import React, {useState} from "react";
import axios from "axios";
import {summereditbg, fotosummeredit} from '../assets/index'
import Dropzone from "react-dropzone";

const SummerEdit = () => {
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const requestEdit = async (files) => {

        const entryData = new FormData()
        files.forEach((file) => {
            entryData.append('files.files', file)
        })
        const textData = {
            Email: email,
            Richieste: description
        }
        entryData.append("data", JSON.stringify(textData))
        console.log(entryData)

        const request = await fetch('http://localhost:1337/api/summer-edits', {
            method: "POST",
            body: entryData
        })
        const response = await request.json()
        console.log(response)
        setEmail('')
        setDescription('')
    }

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
                        <div>
                            <label className='font-bold'>E-Mail:</label>
                            <input className='block border border-gray-300 p-2 rounded' type="email" value={email} onChange={handleEmailChange}/>
                        </div>
                        <div>
                            <label className='font-bold'>Descrizione:</label>
                            <input className='block border border-gray-300 p-2 rounded' type="text" value={description} onChange={handleDescriptionChange}/>
                        </div>
                        <Dropzone onDrop={acceptedFiles => requestEdit(acceptedFiles)}>
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