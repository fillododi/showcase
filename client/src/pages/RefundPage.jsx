import React from "react";
import {Footer, Navbar} from "../components/index.js";

const RefundPage = () => {
    return <div>
        <Navbar/>
        <div className='w-full  bg-[#f9f9f9] py-[50px] my-[80px]'>
            <div className='max-w-[1240px] mx-auto gap-y-12'>
                <p className='text-4xl text-center'>Refund Policy di Showcase Mantova</p>
                <ol className='list-decimal mt-4'>
                    <li>
                        Termine per richiesta di reso:
                        <ul className=''>
                            <li>Il cliente ha un periodo massimo di 2 giorni dalla data di consegna del video finito per richiedere un reso. Al di là di questo periodo, non saranno accettate richieste di reso.</li>
                        </ul>
                    </li>
                    <li>
                        Motivi ammissibili per il reso:
                        <ul className=''>
                            <li>I resi saranno accettati solo in caso di errori o difetti significativi nel contenuto del video, o se non rispetta i dettagli specificati nel contratto originale di produzione.</li>
                        </ul>
                    </li>
                    <li>
                        Processo di richiesta di reso:
                        <ul className=''>
                            <li>Per richiedere un reso, il cliente dovrà inviare una comunicazione scritta indicando il motivo specifico del reso e fornendo elementi di supporto, come screenshot o dettagli rilevanti. La richiesta di reso dovrà essere inviata tramite email all'indirizzo specificato nella nostra sezione Contatti.</li>
                        </ul>
                    </li>
                    <li>
                        Valutazione e risposta:
                        <ul className=''>
                            <li>Dopo aver ricevuto la richiesta di reso, il nostro team esaminerà attentamente il video e i motivi del reso. Entro 5 giorni lavorativi, il cliente riceverà una risposta riguardante l'accettazione o il rifiuto della richiesta di reso.</li>
                        </ul>
                    </li>
                    <li>
                        Soluzioni possibili:
                        <ul className=''>
                            <li>Se la richiesta di reso viene accettata, ci impegniamo a correggere gli errori o i difetti rilevati nel video entro un periodo di tempo ragionevole. Qualora non sia possibile effettuare le correzioni necessarie, si potrà concordare un rimborso parziale o totale dell'importo pagato per il servizio.</li>
                        </ul>
                    </li>
                    <li>
                        Rispetto delle scadenze:
                        <ul className=''>
                            <li>Ci impegniamo a rispettare le scadenze stabilite e consegnare il video finito entro i tempi concordati con il cliente. Qualora si verificassero ritardi nella consegna, il cliente avrà diritto a richiedere un reso senza alcun limite di tempo.</li>
                        </ul>
                    </li>
                    <li>
                        Eccezioni:
                        <ul className=''>
                            <li>Questa politica di reso non si applica nei casi in cui il cliente abbia fornito istruzioni errate o incomplete per la produzione del video.</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
        <Footer/>
    </div>
}

export default RefundPage