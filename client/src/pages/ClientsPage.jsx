import React from "react";
import {Navbar, Footer, ClientList} from '../components'

const ClientsPage = ({clients}) => {
    return <div>
        <Navbar></Navbar>
        <ClientList clients={clients? clients: ""}></ClientList>
        <Footer></Footer>
    </div>
}

export default ClientsPage