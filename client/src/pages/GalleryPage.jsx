import React from "react";
import {Navbar, Footer, Gallery} from '../components'

const GalleryPage = ({posts}) => {
    return <div>
        <Navbar></Navbar>
        <Gallery posts={posts? posts: ""}></Gallery>
        <Footer></Footer>
    </div>
}

export default GalleryPage