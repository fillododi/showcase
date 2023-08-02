import React from "react";
import {Navbar, Footer, PayPalPayment} from '../components'
import {AiOutlineCheckCircle} from "react-icons/ai/index";

const ThankYouPage = () => {
    return <div>
        <Navbar></Navbar>
        <div className='mt-[80px] max-w-[720px] mx-auto py-8 gap-y-8 flex flex-col text-center'>
            <h3 className='text-4xl my-4 text-center'>Ordine ricevuto!</h3>
            <div className='text-9xl text-green-400 flex justify-center'>
                <AiOutlineCheckCircle/>
            </div>
            <p className='text-2xl'>Grazie di aver scelto Showcase!<br/><br/>Ti auguriamo una buona estate</p>
        </div>
        <Footer></Footer>
    </div>
}

export default ThankYouPage