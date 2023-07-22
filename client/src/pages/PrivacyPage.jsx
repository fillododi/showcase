import React from "react";
import {Footer, Navbar} from "../components/index.js";

const PrivacyPage = () => {
    return <div>
        <Navbar/>
        <div className='w-full  bg-[#f9f0c4] py-[50px] my-[80px]'>
            <div className='max-w-[1240px] mx-auto gap-y-12'>
                <p className='text-4xl text-center'>Privacy Policy di Showcase Mantova</p>
                <ol className='list-decimal mt-4'>
                    <li>
                        Raccolta dei dati personali:
                        <ul className=''>
                            <li>Utilizzando il nostro sito o inviando materiale video/foto personali, accettate la nostra Privacy Policy.</li>
                            <li>Showcase Mantova non richiede la registrazione per visualizzare il portfolio dei lavori dei nostri 5 videomaker/fotografi. Tuttavia, nel caso in cui decidiate di inviare materiale video/foto personali (SUMMER EDIT) al nostro team di videomaker, vi chiederemo di fornire il vostro indirizzo email e/o il numero di telefono cellulare per potervi contattare riguardo alla creazione del video.</li>
                        </ul>
                    </li>
                    <li>
                        Trattamento dei dati personali:
                        <ul className=''>
                            <li>I dati personali forniti saranno utilizzati esclusivamente per la creazione del SUMMER EDIT e per eventuali comunicazioni necessarie riguardanti il vostro contributo al progetto. Non utilizzeremo i vostri dati per altre finalità senza il vostro consenso.</li>
                        </ul>
                    </li>
                    <li>
                        Conservazione dei dati:
                        <ul className=''>
                            <li>I vostri dati personali verranno conservati solo per il periodo necessario al completamento del SUMMER EDIT e saranno cancellati dopo aver adempiuto allo scopo per cui sono stati raccolti, a meno che non sia richiesto o consentito dalla legge il mantenimento dei dati per un periodo più lungo.</li>
                        </ul>
                    </li>
                    <li>
                        Sicurezza dei dati:
                        <ul className=''>
                            <li>Adotteremo misure di sicurezza adeguate per proteggere i vostri dati personali da accessi non autorizzati, divulgazione o alterazione. Il nostro team di videomaker tratterà i vostri dati con la massima riservatezza.</li>
                        </ul>
                    </li>
                    <li>
                        Condivisione dei dati:
                        <ul className=''>
                            <li>II vostri dati personali non saranno venduti o condivisi con terze parti al di fuori del nostro team di videomaker/fotografi, a meno che ciò non sia richiesto per ragioni legali o autorizzato dal vostro consenso.</li>
                        </ul>
                    </li>
                    <li>
                        Diritti dell'utente:
                        <ul className=''>
                            <li>Avete il diritto di accedere, correggere o cancellare i vostri dati personali in nostro possesso. Potete esercitare questi diritti contattandoci attraverso le informazioni fornite sul nostro sito.</li>
                        </ul>
                    </li>
                    <li>
                        Cookie e tecnologie simili:
                        <ul className=''>
                            <li>Il nostro sito potrebbe utilizzare cookie o tecnologie simili per migliorare l'esperienza dell'utente. È possibile gestire le preferenze sui cookie attraverso le impostazioni del browser.</li>
                        </ul>
                    </li>
                    <li>
                        Modifiche alla Privacy Policy:
                        <ul className=''>
                            <li>Potremmo aggiornare la nostra Privacy Policy di tanto in tanto per riflettere cambiamenti nel trattamento dei dati o altre esigenze legali. Le modifiche saranno pubblicate sul nostro sito e diventeranno efficaci al momento della pubblicazione.</li>
                            <li>Le modifiche saranno pubblicate sul sito e diventeranno efficaci immediatamente dopo la pubblicazione.</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
        <Footer/>
    </div>
}

export default PrivacyPage