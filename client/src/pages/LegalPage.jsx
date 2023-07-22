import React from "react";
import {Footer, Navbar} from "../components/index.js";

const LegalPage = () => {
    return <div>
        <Navbar/>
        <div className='w-full  bg-[#f9f0c4] py-[50px] my-[80px]'>
            <div className='max-w-[1240px] mx-auto gap-y-12'>
                <p className='text-4xl text-center'>Termini Legali di Showcase Mantova</p>
                <ol className='list-decimal mt-4'>
                    <li>
                        Termini di utilizzo:
                        <ul className='list-disc'>
                            <li>Gli utenti accettano espressamente i termini di utilizzo del sito, accedendo ai servizi offerti.</li>
                            <li>L'utilizzo del sito implica l'accettazione di tutte le condizioni e le limitazioni specificate nei termini di utilizzo, determinando la conferma di espressa lettura e accettazione dei contenuti e delle modalità di prestazione dei servizi.</li>
                        </ul>
                    </li>
                    <li>
                        Privacy e protezione dei dati:
                        <ul className='list-disc'>
                            <li>iIdati personali degli utenti verranno gestiti conservati e protetti nel rispetto del Regolamento Generale Sulla Protezione Dati.</li>
                        </ul>
                    </li>
                    <li>
                        Proprietà intellettuale:
                        <ul className='list-disc'>
                            <li>Tutti i contenuti presenti sul sito, inclusi testi, immagini, video, loghi e grafica, sono di proprietà di "SHOWCASE MANTOVA" o dei suoi collaboratori, e sono protetti dalle leggi sul diritto d'autore.</li>
                            <li>È vietato copiare, riprodurre o utilizzare i contenuti senza autorizzazione da parte del titolare che si intende conferita espressamente, con l'invio, a SHOWCASE MANTOVA.</li>
                        </ul>
                    </li>
                    <li>
                        Servizi offerti:
                        <ul className='list-disc'>
                            <li>"SHOWCASE MANTOVA" offre servizi di videomaking, fotografia e vendita di magliette e merchandise del brand.</li>
                            <li>I servizi sono forniti secondo i termini e le condizioni specificate sul sito.</li>
                        </ul>
                    </li>
                    <li>
                        Pagamenti:
                        <ul className='list-disc'>
                            <li>I pagamenti per i servizi offerti possono essere effettuati tramite PayPal e Nexi.</li>
                            <li>Le informazioni di pagamento fornite dagli utenti saranno trattate in conformità con le leggi sulla privacy.</li>
                        </ul>
                    </li>
                    <li>
                        Collegamenti a terze parti:
                        <ul className='list-disc'>
                            <li>Il sito potrebbe includere collegamenti a profili Instagram dei collaboratori di "SHOWCASE MANTOVA".</li>
                            <li>"SHOWCASE MANTOVA" non è responsabile per il contenuto o le azioni di terze parti.</li>
                        </ul>
                    </li>
                    <li>
                        Limitazione di responsabilità:
                        <ul className='list-disc'>
                            <li>"SHOWCASE MANTOVA" si impegna a fornire informazioni accurate e servizi di qualità, ma non può garantire l'assenza di errori o interruzioni.</li>
                            <li>"SHOWCASE MANTOVA" non è responsabile per eventuali danni derivanti dall'uso del sito o dei suoi servizi.</li>
                        </ul>
                    </li>
                    <li>
                        Modifiche ai termini legali:
                        <ul className='list-disc'>
                            <li>"SHOWCASE MANTOVA" si riserva il diritto di apportare modifiche ai termini legali in qualsiasi momento.</li>
                            <li>Le modifiche saranno pubblicate sul sito e diventeranno efficaci immediatamente dopo la pubblicazione.</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
        <Footer/>
    </div>
}

export default LegalPage