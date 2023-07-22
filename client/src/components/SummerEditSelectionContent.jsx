import React, {useState} from "react";
import {Textarea, Input} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import checkMediaType from "../utils/mediatypes.jsx";
import {FiMusic, AiOutlinePlus} from "react-icons/all.js";
import {PayPalPayment} from "./index.js";
import useWindowDimensions from "../hooks/useWindowDimensions.js";

const SummerEditSelectionContent = () => {
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [checkout, setCheckout] = useState(false)
    const [editId, setEditId] = useState(null)

    const {type} = useParams()
    const {width, height} = useWindowDimensions()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleCheckout = () => {
        if(email === '' || description === '' || selectedFiles.length === 0){
            alert('Riempi tutti i campi')
        } else {
            let imgCount = 0
            let videoCount = 0
            let audioCount = 0
            selectedFiles.map(file => {
                console.log(file)
                if(checkMediaType(file.path) === 'image'){
                    imgCount++
                }
                if(checkMediaType(file.path) === 'audio'){
                    audioCount++
                }
                if(checkMediaType(file.path)[0] === 'video'){
                    videoCount++
                }
            })
            if(videoCount > 1) {
                alert('Inserisci massimo 1 video')
            } else if(audioCount > 1) {
                alert('Inserisci massimo 1 traccia audio')
            } else if(imgCount > 8) {
                alert('Inserisci massimo 8 foto')
            } else {
                setCheckout(true)
                requestEdit(selectedFiles)
            }
        }
    }
    const requestEdit = async (files) => {
        const entryData = new FormData()
        files.forEach((file) => {
            entryData.append('files.files', file)
        })
        const textData = {
            email: email,
            richieste: description,
            pagato: false
        }
        entryData.append("data", JSON.stringify(textData))
        console.log(entryData)

        const request = await fetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_STRAPI_PORT}/api/summer-edits`, {
            method: "POST",
            body: entryData
        })
        const response = await request.json()
        setEditId(response.data.id)
    }

    const MiniDropzone = () => {
        const {getRootProps, getInputProps} = useDropzone({
            accept: type === '50' ?
                {'video/mov': [], 'video/mp4': [], 'video/avi': [], 'audio/mpeg': []}
                : type === '80' ?
                    {
                        'video/mov': [],
                        'video/mp4': [],
                        'video/avi': [],
                        'image/png': [],
                        'image/jpg': [],
                        'image/jpeg': [],
                        'audio/mpeg': []
                    }
                    : {},
            maxFiles: type === '50' ? 2 - selectedFiles.length : type === '80' ? 10 - selectedFiles.length : 0,
            onDrop: acceptedFiles => {
                setSelectedFiles([...selectedFiles, ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))])
            }
        })

        return <div {...getRootProps({className:'dropzone rounded-lg border border-gray-400 w-[8rem] h-[8rem] border-dashed flex items-center justify-center hover:border-solid'})}>
            <input {...getInputProps()}></input>
            <AiOutlinePlus className='text-6xl m-auto'/>
        </div>
    }

    const Dropzone = () => {
        const {getRootProps, getInputProps} = useDropzone({
            accept: type === '50'?
                {'video/mov': [],'video/mp4': [],'video/avi': [],'audio/mpeg': []}
                : type === '80'?
                    {'video/mov': [],'video/mp4': [],'video/avi': [],'image/png': [],'image/jpg': [],'image/jpeg': [],'audio/mpeg': []}
                    : {},
            maxFiles: type === '50'? 2: type === '80'? 10: 0,
            onDrop: acceptedFiles => {
                setSelectedFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })))
            }

        })
        return <section className='container bg-[#f9f0c4]'>
            {selectedFiles.length === 0?
                <div {...getRootProps({className: `dropzone ${width>=1240? 'sm:my-[10rem]':'my-8'} border-dashed border-2 border-gray-300 rounded-md p-4 text-center hover:border-solid`})}>
                    <input {...getInputProps()} />
                    {type === '50' && <p>Trascina qui il video e la traccia audio (opzionale), o clicca per selezionarlo</p>}
                    {type === '80' && <p>Trascina qui il video, le foto (fino a 8) e la traccia audio, o clicca per selezionarli</p>}
                </div>
                :
                <div className='flex flex-col gap-y-4'>
                    <p className='font-bold text-xl'>File(s) selezionati:</p>
                    <div className={`${width < 1240? 'grid grid-cols-1 xs:grid-cols-2 sm:!grid-cols-4': 'grid grid-cols-3 xl:grid-cols-5'} gap-y-8'`}>
                        {selectedFiles.map(file => <div className='rounded-lg border border-gray-400 w-[8rem] h-[8rem] overflow-hidden flex items-center justify-center'>
                            {checkMediaType(file.name) === 'image' && <img src={file.preview} className='object-cover' onLoad={()=>{URL.revokeObjectURL(file.preview)}}/>}
                            {checkMediaType(file.name)[0] === 'video' && <video className='object-cover' autoPlay loop muted onLoad={()=>{URL.revokeObjectURL(file.preview)}}>
                                <source src={file.preview}  type={`video/${checkMediaType(file.name)[1]}`}/>
                            </video>}
                            {checkMediaType(file.name) === 'audio' && <FiMusic className='text-6xl m-auto' onLoad={()=>{URL.revokeObjectURL(file.preview)}}/>}
                        </div>)}
                        {(selectedFiles.length < 2 && type === '50' || selectedFiles.length < 10 && type === '80') && <MiniDropzone/>}
                    </div>
                </div>
            }
        </section>
    }

    return <div className="w-full mt-[80px] ">
        <div className='mx-auto  pb-[50px] p-16'>
            {checkout === false ?
                width >= 1240?
                    <div className='gap-x-16 text-black flex flex-row justify-between'>
                        <div className='border-2 border-gray-400 rounded-lg w-1/2'>
                            <p className='m-4 text-justify'>
                                Politica di Servizio di Editing Video e Rimborso<br/><br/>
                                1.	Servizio di Editing Video:<br/>
                                Offro un servizio professionale di editing video, in cui accetto materiale video/fotografico fornito dai clienti per elaborarlo secondo le loro richieste specifiche.<br/>
                                2.	Processo di Lavorazione:<br/>
                                2.1. Iniziale Consultazione: Prima di iniziare il lavoro di editing, discuteremo in dettaglio le tue aspettative, preferenze e requisiti specifici per assicurarci che io abbia una comprensione chiara delle tue richieste.<br/>
                                2.2. Consegna del Materiale: Dovrai fornirmi il materiale video/fotografico completo e tutti i dettagli aggiuntivi necessari per il tuo progetto. Opzionale l’aggiunta di una traccia audio<br/>
                                2.3. Lavoro di Editing: Effettuerò l’editing del materiale secondo le tue specifiche, applicando le mie competenze e la mia esperienza professionale per creare un prodotto finale di alta qualità.<br/>
                                3.	Revisioni e Modifiche:<br/>
                                3.1. Anteprima del Prodotto: Ti fornirò un’anteprima del prodotto finale, in genere sotto forma di un video privato o un set di immagini, per consentirti di valutare il lavoro svolto.<br/>
                                3.2. Feedback e Modifiche: Se il prodotto finale non soddisfa le tue aspettative, sarai in grado di fornirmi un feedback specifico sulle modifiche richieste. Mi impegno a lavorare con te per apportare le modifiche necessarie al fine di raggiungere il risultato desiderato.<br/>
                                4.	Rimborso:<br/>
                                4.1. Soddisfazione Garantita: Cerco di garantire la tua completa soddisfazione con il servizio di editing video. Se non sei soddisfatto del prodotto finale, hai diritto a richiedere un rimborso completo.<br/>
                                4.2. Richiesta di Rimborso: Per richiedere un rimborso, dovrai inviarmi una comunicazione scritta entro 2 giorni dalla ricezione del prodotto finale. Spiega dettagliatamente le ragioni per cui non sei soddisfatto e fornisci tutti i feedback specifici sulle modifiche richieste.<br/>
                                4.3. Risoluzione Alternativa: Prima di procedere con un rimborso completo, mi impegnerò a risolvere le tue preoccupazioni e a cercare una soluzione alternativa che possa soddisfarti. Ciò può includere ulteriori modifiche o un ulteriore round di revisioni.<br/>
                                5.	Diritti di Utilizzo:<br/>
                                Tieni presente che, a meno che non sia diversamente concordato, il diritto di utilizzo del materiale video/fotografico fornito dai clienti rimarrà di tua proprietà. Non utilizzerò o divulgherò il tuo materiale senza il tuo consenso.<br/><br/>
                                Firma: Showcasemantova
                            </p>
                        </div>
                        <form onSubmit={handleCheckout} className='flex flex-col w-1/2 gap-y-8'>
                            <div className='flex flex-col ml-16 gap-y-4 w-1/3'>
                                <label className='font-bold text-xl'>Email:</label>
                                <Input className='border-gray-400' type='email' label='Inserisci qui la tua E-Mail' required value={email} onChange={handleEmailChange}/>
                            </div>
                            <div className='flex flex-col ml-16 gap-y-4'>
                                <label className='font-bold text-xl'>Inserisci le tue richieste:</label>
                                <Textarea label='Scrivi qui quello che dobbiamo fare' className='border-gray-400' type='text' required value={description} onChange={handleDescriptionChange}/>
                            </div>
                            <div className='ml-16'>
                                <Dropzone/>
                            </div>
                            <div className='ml-16 flex justify-center'>
                                <button className={`mt-8 rounded-lg py-2 px-4 bg-blue-700 ${selectedFiles.length === 0? 'bg-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white hover:cursor-default': 'hover:bg-white'}`} type='submit'>Acquista Ora</button>
                            </div>
                        </form>
                    </div>
                    :
                    <div className='flex flex-col'>
                        <form className='gap-x-16 text-black flex flex-col justify-between' onSubmit={handleCheckout}>
                            <div className='flex flex-col gap-y-4 justify-center' >
                                <div className='flex flex-col gap-y-4'>
                                    <label className='font-bold text-xl'>Email:</label>
                                    <Input className='border-gray-400' required type='email' label='Inserisci qui la tua E-Mail' value={email} onChange={handleEmailChange}/>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <label className='font-bold text-xl'>Inserisci le tue richieste:</label>
                                    <Textarea label='Scrivi qui quello che dobbiamo fare' required className='border-gray-400' type='text' value={description} onChange={handleDescriptionChange}/>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div>
                                    <Dropzone/>
                                </div>
                                <div className='flex justify-center'>
                                    <button className={`mt-8 rounded-lg py-2 px-4 ${selectedFiles.length === 0? 'bg-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white hover:cursor-default': 'hover:bg-white'}`} type='submit'>Acquista Ora</button>
                                </div>
                            </div>
                        </form>
                        <hr className='mt-8 border-gray-600'/>
                        <p className='m-4 text-justify'>
                            Politica di Servizio di Editing Video e Rimborso<br/><br/>
                            1.	Servizio di Editing Video:<br/>
                            Offro un servizio professionale di editing video, in cui accetto materiale video/fotografico fornito dai clienti per elaborarlo secondo le loro richieste specifiche.<br/>
                            2.	Processo di Lavorazione:<br/>
                            2.1. Iniziale Consultazione: Prima di iniziare il lavoro di editing, discuteremo in dettaglio le tue aspettative, preferenze e requisiti specifici per assicurarci che io abbia una comprensione chiara delle tue richieste.<br/>
                            2.2. Consegna del Materiale: Dovrai fornirmi il materiale video/fotografico completo e tutti i dettagli aggiuntivi necessari per il tuo progetto. Opzionale l’aggiunta di una traccia audio<br/>
                            2.3. Lavoro di Editing: Effettuerò l’editing del materiale secondo le tue specifiche, applicando le mie competenze e la mia esperienza professionale per creare un prodotto finale di alta qualità.<br/>
                            3.	Revisioni e Modifiche:<br/>
                            3.1. Anteprima del Prodotto: Ti fornirò un’anteprima del prodotto finale, in genere sotto forma di un video privato o un set di immagini, per consentirti di valutare il lavoro svolto.<br/>
                            3.2. Feedback e Modifiche: Se il prodotto finale non soddisfa le tue aspettative, sarai in grado di fornirmi un feedback specifico sulle modifiche richieste. Mi impegno a lavorare con te per apportare le modifiche necessarie al fine di raggiungere il risultato desiderato.<br/>
                            4.	Rimborso:<br/>
                            4.1. Soddisfazione Garantita: Cerco di garantire la tua completa soddisfazione con il servizio di editing video. Se non sei soddisfatto del prodotto finale, hai diritto a richiedere un rimborso completo.<br/>
                            4.2. Richiesta di Rimborso: Per richiedere un rimborso, dovrai inviarmi una comunicazione scritta entro 2 giorni dalla ricezione del prodotto finale. Spiega dettagliatamente le ragioni per cui non sei soddisfatto e fornisci tutti i feedback specifici sulle modifiche richieste.<br/>
                            4.3. Risoluzione Alternativa: Prima di procedere con un rimborso completo, mi impegnerò a risolvere le tue preoccupazioni e a cercare una soluzione alternativa che possa soddisfarti. Ciò può includere ulteriori modifiche o un ulteriore round di revisioni.<br/>
                            5.	Diritti di Utilizzo:<br/>
                            Tieni presente che, a meno che non sia diversamente concordato, il diritto di utilizzo del materiale video/fotografico fornito dai clienti rimarrà di tua proprietà. Non utilizzerò o divulgherò il tuo materiale senza il tuo consenso.<br/><br/>
                            Firma: Showcasemantova
                        </p>
                    </div>

                :
                <div className='max-w-[720px] mx-auto py-8 gap-y-8 flex flex-col text-center'>
                    <h3 className='text-4xl my-4 text-center'>Riepilogo</h3>
                    <p className='text-2xl'>Email: {email}</p>
                    <p className='text-2xl'>Richieste: {description}</p>
                    <p className='text-2xl'>N° File(s) Selezionati: {selectedFiles.length}</p>
                    <hr className='border-black'/>
                    <p className='text-2xl'>Costo: {type}€</p>
                    <PayPalPayment item={`summeredit${type}`} key={editId} id={editId}></PayPalPayment>
                </div>
            }
        </div>
    </div>
}

export default SummerEditSelectionContent