import React from "react";
import {Footer, Navbar, Posts} from "../components/index.js";

const Homepage = ({posts}) => {
    return <div>
        <Navbar/>
        <Posts posts={posts? posts: ""}/>
        <Footer/>
    </div>
}

export default Homepage