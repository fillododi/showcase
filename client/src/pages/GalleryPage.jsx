import React from "react";
import {Navbar, Footer, Gallery} from '../components'

const GalleryPage = ({clients}) => {
    return <div>
        <Navbar></Navbar>
        <Gallery clients={clients? clients: ""}></Gallery>
        <Footer></Footer>
    </div>
}

export default GalleryPage