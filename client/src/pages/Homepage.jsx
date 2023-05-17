import React from "react";
import {Footer, Navbar, HomeContent} from "../components/index.js";

const Homepage = ({posts}) => {
    return <div>
        <Navbar/>
        <HomeContent posts={posts? posts: ""}/>
        <Footer/>
    </div>
}

export default Homepage