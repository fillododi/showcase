import React from "react";
import {Footer, Navbar, HomeContent} from "../components/index.js";

const Homepage = ({posts, clients}) => {
    return <div>
        <Navbar/>
        <HomeContent posts={posts? posts: ""} clients={clients? clients: ""}/>
        <Footer/>
    </div>
}

export default Homepage