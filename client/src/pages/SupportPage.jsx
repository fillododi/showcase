import React from "react";
import {Footer, Navbar} from "../components/index.js";

const SupportPage = () => {
    return <div>
        <Navbar/>
        <div className='w-full  py-[50px] my-[80px]'>
            <div className='max-w-[1240px] mx-auto gap-y-12'>
                <p className='text-4xl text-center'>Customer Support Policy di Showcase Mantova</p>
                <ol className='list-decimal mt-4'>
                    <li>
                        Obiettivo:
                        <ul className=''>
                            <li>Il nostro obiettivo è fornire un'esperienza eccellente e soddisfacente per tutti i clienti di Showcasemantova che utilizzano il nostro sito di videomaking e fotografia. Ci impegniamo a garantire un supporto tempestivo, professionale e cortese per aiutare i nostri clienti a ottenere il massimo dal nostro servizio.</li>
                        </ul>
                    </li>
                    <li>
                        Canali di comunicazione:
                        <ul className=''>
                            <li>Offriamo la possibilità di contattarci via e-mail a support@showcasemantova.com per ricevere supporto personalizzato.</li>
                        </ul>
                    </li>
                    <li>
                        Orari di assistenza:
                        <ul className=''>
                            <li>Il nostro team di assistenza clienti è disponibile dal lunedì al venerdì, dalle ore 11:00 alle ore 18:00, fuso orario di Showcasemantova. Risponderemo alle richieste dei clienti entro un massimo di 24 ore lavorative.</li>
                        </ul>
                    </li>
                    <li>
                        Tipologie di supporto:
                        <ul className=''>
                            <li>Forniamo supporto per una vasta gamma di argomenti, tra cui:<br/>
                                1. Aiuto tecnico: risoluzione di problemi tecnici relativi al funzionamento del sito.<br/>
                                2. Domande sui servizi: informazioni riguardanti le funzionalità e i servizi offerti da Showcasemantova.<br/>
                                3. Indicazioni e guide: assistenza nella navigazione del sito e nell'utilizzo delle sue funzionalità.<br/>
                                4. Problemi con gli ordini: risoluzione di problemi legati a ordini e pagamenti.</li>
                        </ul>
                    </li>
                    <li>
                        Tempo di risoluzione:
                        <ul className=''>
                            <li>Ci impegniamo a fornire risposte tempestive ed efficaci a tutte le richieste di assistenza. La maggior parte dei problemi verrà risolta entro 2 giorni lavorativi, ma alcuni casi complessi potrebbero richiedere più tempo.</li>
                        </ul>
                    </li>
                    <li>
                        Feedback dei clienti:
                        <ul className=''>
                            <li>Siamo sempre aperti ai feedback dei nostri clienti. Ci impegniamo a prendere in considerazione tutte le opinioni e le osservazioni ricevute per migliorare costantemente la qualità del nostro servizio.</li>
                        </ul>
                    </li>
                    <li>
                        Rispetto e cortesia:
                        <ul className=''>
                            <li>Chiediamo ai nostri clienti di trattare il nostro team di supporto con rispetto e cortesia, così come ci impegniamo a fare con loro. Qualsiasi forma di linguaggio offensivo o comportamento inappropriato non sarà tollerata e potrebbe comportare la chiusura della richiesta di assistenza senza ulteriori risposte.</li>
                        </ul>
                    </li>
                    <li>
                        Aggiornamento della politica:
                        <ul className=''>
                            <li>Ci riserviamo il diritto di apportare modifiche a questa politica di assistenza clienti in qualsiasi momento. Gli aggiornamenti verranno pubblicati sul nostro sito web, e i clienti saranno informati tramite notifiche se necessario.</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
        <Footer/>
    </div>
}

export default SupportPage
