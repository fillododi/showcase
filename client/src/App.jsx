import {Routes, Route, Link} from "react-router-dom";
import {Homepage, PostContentPage, BookPage} from "./pages/index.js";
import useFetch from './hooks/useFetch'
import GalleryPage from "./pages/GalleryPage.jsx";
import SummerEditPage from "./pages/SummerEditPage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SelectionPage from "./pages/SelectionPage.jsx"
import ThankYouPage from "./pages/ThankYouPage.jsx"
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RefundPage from "./pages/RefundPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import {CookieConsent} from "react-cookie-consent";

export default function App() {

    const payPalInitalOptions = {
        clientId: import.meta.env.VITE_PAYPALCLIENTID,
        currency: "EUR",
        intent: "capture"
    }

    let {loading: loadingPosts, data: posts, error: errorPosts} = useFetch(`${import.meta.env.VITE_BASE_URL}/strapi/api/blogs?populate=*`)
    let {loading: loadingClients, data: clients, error: errorClients} = useFetch(`${import.meta.env.VITE_BASE_URL}/strapi/api/clienti?populate=deep,3`)
    if(loadingPosts) return <p>Caricando</p>
    if(errorPosts) return <p>a</p>
    return <ScrollToTop><Routes>
        <Route path='/' element={<Homepage posts={posts? posts: ""} clients={clients? clients: ""}/>}></Route>
        <Route path='/post/:id' element={<PostContentPage posts={posts? posts: ""}/>}></Route>
        <Route path='/book' element={<BookPage/>}></Route>
        <Route path='/gallery' element={<GalleryPage clients={clients? clients: ""}/>}></Route>
        <Route path='/summeredit' element={<SummerEditPage/>}></Route>
        <Route path='/purchasesummeredit/:type' element={<PayPalScriptProvider options={payPalInitalOptions}><SelectionPage/></PayPalScriptProvider>}></Route>
        <Route path='/legal' element={<LegalPage/>}></Route>
        <Route path='/privacy' element={<PrivacyPage/>}></Route>
        <Route path='/refund' element={<RefundPage/>}></Route>
        <Route path='/support' element={<SupportPage/>}></Route>
        <Route path='/thankyou' element={<ThankYouPage/>}></Route>
    </Routes>
        <CookieConsent buttonText='Ho Capito'>
            Utilizzare il sito Showcase Mantova comporta l'accettazione dei <sp></sp>
            <Link to='/legal' className='underline'>Termini Legali</Link>,
            della <Link to='/refund' className='underline'>Refund Policy</Link>
            <sp></sp> e della <Link to='/privacy' className='underline'>Privacy Policy</Link>
        </CookieConsent>
    </ScrollToTop>
}
