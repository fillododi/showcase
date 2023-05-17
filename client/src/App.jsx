import {Routes, Route} from "react-router-dom";
import {Homepage, PostContentPage, BookPage} from "./pages/index.js";
import useFetch from './hooks/useFetch'

export default function App() {
    let {loading, data, error} = useFetch('http://localhost:1337/api/blogs?populate=*')
    if(loading) return <p>Caricando</p>
    if(error) return <p>Errore</p>

    return <Routes>
        <Route path='/' element={<Homepage posts={data? data: ""}/>}></Route>
        <Route path='/post/:id' element={<PostContentPage posts={data? data: ""}/>}></Route>
        <Route path='/book' element={<BookPage/>}></Route>
    </Routes>
}
