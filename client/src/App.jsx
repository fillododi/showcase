import {Routes, Route} from "react-router-dom";
import {Homepage, PostContentPage, BookPage, ClientsPage} from "./pages/index.js";
import useFetch from './hooks/useFetch'
import GalleryPage from "./pages/GalleryPage.jsx";

export default function App() {
    let {loading: loadingPosts, data: posts, error: errorPosts} = useFetch('http://localhost:1337/api/blogs?populate=*')
    let {loading: loadingClients, data: clients, error: errorClients} = useFetch('http://localhost:1337/api/clienti?populate=deep,3')
    if(loadingPosts) return <p>Caricando</p>
    if(errorPosts) return <p>Errore</p>
    return <Routes>
        <Route path='/' element={<Homepage posts={posts? posts: ""}/>}></Route>
        <Route path='/post/:id' element={<PostContentPage posts={posts? posts: ""}/>}></Route>
        <Route path='/book' element={<BookPage/>}></Route>
        <Route path='/gallery' element={<GalleryPage clients={clients? clients: ""}/>}></Route>
        <Route path='/clients' element={<ClientsPage clients={clients? clients: ""}/>}></Route>
    </Routes>
}
