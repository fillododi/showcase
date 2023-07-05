import React, {useEffect, useRef, useState} from "react";
import {summereditthumbnail, pacchetto50, pacchetto80, sfondosummeredit} from '../assets/index'
import {useDropzone} from "react-dropzone";
import {redirect} from "react-router-dom";
import {PayPalPayment} from "./index.js";
import './SummerEdit/styles.css'

const SummerEdit = () => {
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [selectedPack, setSelectedPack] = useState(50)
    const [showPayment, setShowPayment] = useState(false)
    const [droppedFiles, setDroppedFiles] = useState([])
    const [checkout, setCheckout] = useState(false)
    const [editId, setEditId] = useState(null)

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    useEffect(()=> {
        document.getElementById('root').scrollIntoView()
    }, [])
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const DropzoneVideo = (pack) => {
        let {
            acceptedFiles,
            fileRejections,
            getRootProps,
            getInputProps
        } = useDropzone({
            accept: {
                'video/mov': [],
                'video/mp4': [],
                'video/avi': [],
                'audio/mp3': [],
            },
            maxFiles: 2,
            onDrop: files => {
                setDroppedFiles(files)
                setShowPayment(true)
            }
        })

        return (
            <section className="container">
                <div {...getRootProps({ className: 'dropzone my-[10rem] border-dashed border-2 border-gray-300 rounded-md p-4 text-center' })}>
                    <input {...getInputProps()} />
                    <p>Trascina qui il video e la traccia audio (opzionale), o clicca per selezionarlo</p>
                </div>
            </section>
        )
    }
    const DropzoneVideoFoto = (pack) => {
        let {
            acceptedFiles,
            fileRejections,
            getRootProps,
            getInputProps
        } = useDropzone({
            accept: {
                'video/mov': [],
                'video/mp4': [],
                'video/avi': [],
                'image/png': [],
                'image/jpg': [],
                'image/jpeg': [],
                'audio/mp3': []
            },
            maxFiles: 10,
            onDrop: files => {
                setDroppedFiles(files)
                setShowPayment(true)
            }
        })

        return (
            <section className="container">
                <div {...getRootProps({ className: 'dropzone my-[10rem] border-dashed border-2 border-gray-300 rounded-md p-4 text-center' })}>
                    <input {...getInputProps()} />
                    <p>Trascina qui il video, le foto (fino a 8) e la traccia audio, o clicca per selezionarli</p>
                </div>
            </section>
        )
    }

    const handleCheckout = () => {
        if(email === '' || description === '' || droppedFiles === []){
            alert('Riempi tutti i campi')
        } else {
            requestEdit(droppedFiles)
            setCheckout(true)
        }
    }
    const requestEdit = async (files) => {

        /*METODO 1: CREA LA ENTRY E CARICA L FILE ALLO STESSO TEMPO, MA NON LI LINKA*/
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

        const request = await fetch('http://localhost:1337/api/summer-edits', {
            method: "POST",
            body: entryData
        })
        const response = await request.json()
        setEditId(response.data.id)
    }

    const handleScroll = () => {
        ref1.current?.scrollIntoView({behavior: 'smooth'})
    }

    return <div className="w-full">
        <div className='video-container overflow-hidden'>
            <video autoPlay muted loop src={sfondosummeredit} className='video-sfondo'></video>
        </div>
        {!checkout?
            <div className=' mx-auto  pb-[50px]'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 gap-x-8  text-black flex'>
                        <div className='col-span-4 gap-x-8 h-[900px]'>
                            <video src={summereditthumbnail} loop autoPlay muted className='h-full w-full object-cover'></video>
                            <button onClick={handleScroll} id="overlay-button" className='font-semibold py-2 px-4 rounded-4xl hover:bg-white'>
                                Vedi Pacchetti
                            </button>
                        </div>
                        <div className='col-span-4 flex flex-row mb-64' ref={ref1}>
                            <div className='w-[50%] py-8 flex flex-col justify-center items-center'>
                                <img src={pacchetto50} className='w-[50%]'/>
                                <p className='text-xl'>Edit Video</p>
                                <p className='text-3xl'>50€</p>
                                <button onClick={()=>{
                                    setSelectedPack(50)
                                    ref2.current?.scrollIntoView({behavior: 'smooth'})
                                }} className='mt-8 rounded-xl hover:bg-white py-2 px-4'>Acquista Pacchetto</button>
                            </div>
                            <div className='w-[50%] py-8 flex flex-col justify-center items-center'>
                                <img src={pacchetto80} className='w-[50%]'/>
                                <p className='text-xl'>Edit Video + Foto</p>
                                <p className='text-3xl'>80€</p>
                                <button onClick={()=>{
                                    setSelectedPack(80)
                                    ref2.current?.scrollIntoView({behavior: 'smooth'})
                                }} className='mt-8 rounded-xl hover:bg-white py-2 px-4'>Acquista Pacchetto</button>
                            </div>
                        </div>
                        <div className='flex flex-row col-span-4 gap-x-4 mx-8' ref={ref2}>
                            <div className='col-span-2 justify-center text-justify justify-center w-[50%]'>
                                <p className='mb-4 text-s'>
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
                            <div className='col-span-2 flex flex-col justify-center w-[50%]'>
                                <div className='w-[100%]'>
                                    <label className='font-bold'>Inserisci la tua E-Mail:</label>
                                    <input className='block border border-gray-300 p-2 rounded w-[30%]' type="email" value={email} onChange={handleEmailChange}/>
                                </div>
                                <div>
                                    <label className='font-bold'>Descrivi il risultato finale:</label>
                                    <textarea className='block border border-gray-300 p-2 rounded w-full' type="text" value={description} onChange={handleDescriptionChange}/>
                                </div>
                                {selectedPack === 50 && <DropzoneVideo pack = {selectedPack}></DropzoneVideo>}
                                {selectedPack === 80 && <DropzoneVideoFoto pack = {selectedPack}></DropzoneVideoFoto>}
                                {showPayment && <div>
                                    <button className='w-full' onClick={handleCheckout}>Acquista Ora</button>
                                </div>}
                            </div>
                        </div>
                    </div>
            </div>
            :
            <div>
                <h3>Riepilogo</h3>
                <p>Email: {email}</p>
                <p>Descrizione: {description}</p>
                <p>File selezionati: {droppedFiles.map(file => file.name)}</p>
                <p>Costo: {selectedPack}.00€</p>
                <PayPalPayment item={`summeredit${selectedPack}`} key={editId} id={editId}></PayPalPayment>
            </div>
        }
    </div>
}

export default SummerEdit