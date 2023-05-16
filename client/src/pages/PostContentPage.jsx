import React from "react";
import {Footer, Navbar, PostContent} from "../components/index.js";

const PostContentPage = ({posts}) => {
    return <div>
        <Navbar/>
        <PostContent posts={posts}/>
        <Footer/>
    </div>
}

export default PostContentPage