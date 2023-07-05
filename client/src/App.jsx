import {Routes, Route} from "react-router-dom";
import {Homepage, PostContentPage, BookPage} from "./pages/index.js";
import useFetch from './hooks/useFetch'
import GalleryPage from "./pages/GalleryPage.jsx";
import SummerEditPage from "./pages/SummerEditPage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

export default function App() {
    const payPalInitalOptions = {
        clientId: "AU-kxcST_U76pll4RgLiXtZp-lGWWV6DlpdWeAzdN_e9HRO7sdNQtrNIdDFr4rhiLEkRQa_rT7PeFcxX",
        currency: "EUR",
        intent: "capture"
    }

    let {loading: loadingPosts, data: posts, error: errorPosts} = useFetch('http://localhost:1337/api/blogs?populate=*')
    let {loading: loadingClients, data: clients, error: errorClients} = useFetch('http://localhost:1337/api/clienti?populate=deep,3')
    if(loadingPosts) return <p>Caricando</p>
    if(errorPosts) return <p>Errore</p>
    return <Routes>
        <Route path='/' element={<Homepage posts={posts? posts: ""} clients={clients? clients: ""}/>}></Route>
        <Route path='/post/:id' element={<PostContentPage posts={posts? posts: ""}/>}></Route>
        <Route path='/book' element={<BookPage/>}></Route>
        <Route path='/gallery' element={<GalleryPage clients={clients? clients: ""}/>}></Route>
        <Route path='/summeredit' element={<PayPalScriptProvider options={payPalInitalOptions}><SummerEditPage/></PayPalScriptProvider>}></Route>
        <Route path='/purchasesummeredit' element={<BookPage/>}></Route>
        <Route path='/legal' element={<LegalPage/>}></Route>
    </Routes>
}
