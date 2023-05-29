import React, {useState, useEffect} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import Modal from 'react-modal'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './BookingCalendar/styles.css'
import moment from "moment/min/moment-with-locales";

import calendarToolbar from './CalendarToolbar.jsx'

import useFetch from "../hooks/useFetch";
import {dateFormat} from "react-big-calendar/lib/utils/propTypes.js";
const BookingCalendar = () => {
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [prenotations, setPrenotations] = useState([])
    const [renderDate, setRenderDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [selectedSlots, setSelectedSlots] = useState({start: null, end: null})

    moment.locale('it')
    const localizer = momentLocalizer(moment)

    let {loading, data, error} = useFetch('http://localhost:1337/api/prenotazioni')
    try{
        data = data.data.filter(prenotation => prenotation.attributes.accettata == 1)
    } catch (e){
        console.log(e)
    }

    useEffect(()=>{
        try{
            if (!(JSON.stringify(prenotations) == JSON.stringify(data))){
                setPrenotations(data)
            }
        } catch (e) {console.log(e)}
    }, [data, prenotations])

    const requestBooking = (booking) => {
        fetch('http://localhost:1337/api/prenotazioni', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email: booking.email,
                    descrizione: booking.description,
                    inizio: booking.startTime,
                    fine: booking.endTime,
                    accettata: 0
                }
            })
        })
    }

    const validateBookingTimeSlot = (slot) => {
        if(slot.getDay() >= 1 && slot.getDay() <= 5 && slot.getHours() < 13 || //Mon-Fri before 13.00
            slot.getDay() >= 1 && slot.getDay() <= 5 && slot.getHours() > 13 &&
            (slot.getHours() < 18 || slot.getHours() == 18 && slot.getMinutes() < 30) || //Mon-Fri 14.00-18.30
            (slot.getDay() == 0 || slot.getDay() == 6) && slot.getHours() < 8 //Sat-Sun before 8.00)
        ){
            return false
        } else {
            return true
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleNavigate = (action) => {
        if(action == "PREV"){
            setRenderDate((prevDate) => {
                const newWeek = new Date(prevDate)
                newWeek.setDate(newWeek.getDate()-7)
                return newWeek
            })
        }
        else if(action == "NEXT"){
            setRenderDate((prevDate) => {
                const newWeek = new Date(prevDate)
                newWeek.setDate(newWeek.getDate()+7)
                return newWeek
            })
        }
        else if(action == "TODAY"){
            setRenderDate(new Date())
        }
    }
    const getSlotProps = (slotStart) => {
        if(!validateBookingTimeSlot(slotStart)){
            return {
                style: {
                    backgroundColor: 'gray',
                    opacity: 0.3
                }
            }
        }
        return {}
    }
    const handleSlotSelection = (slotInfo) => {
        if(validateBookingTimeSlot(slotInfo.start)){
            if(!selectedSlots.start || !(selectedSlots.start.getDate() === slotInfo.start.getDate()) || selectedSlots.start.getHours() >= slotInfo.end.getHours()){
                setSelectedSlots({start: slotInfo.start, end: null})
            } else {
                setSelectedSlots({start: selectedSlots.start, end: slotInfo.end})
                setShowModal(true)
            }
        }
    }
    const handleBookingCreation = () => {
        const booking = {
            startTime: selectedSlots.start,
            endTime: selectedSlots.end,
            email: email,
            description: description
        }

        requestBooking(booking)
        setShowModal(false)
    }
    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedSlots({start: null, end: null})
        setEmail('')
        setDescription('')
    }

    return <div className='container mx-auto p-4'>
        <h2 className='text-2x1 font-bold mb-4'>Calendario</h2>
        {prenotations?
            <div>
                {/* Render the React Big Calendar */}
                <Calendar events={prenotations} localizer={localizer}
                          startAccessor={prenotation => new Date(prenotation.attributes.inizio)}
                          endAccessor={prenotation => new Date(prenotation.attributes.fine)}
                          view={'week'}
                          components={{
                              toolbar: (props) => calendarToolbar(handleNavigate)
                          }}
                          date={renderDate} selectable='ignoreEvents' onSelectSlot={handleSlotSelection}
                          slotPropGetter={getSlotProps} dayLayoutAlgorithm='no-overlap'
                />
                <Modal isOpen={showModal} onRequestClose={handleCloseModal} contentLabel="Prenota">
                    <h2>Dettagli della prenotazione</h2>
                    <div>
                        <label className='font-bold'>E-Mail:</label>
                        <input className='block border border-gray-300 p-2 rounded' type="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <label className='font-bold'>Descrizione:</label>
                        <input className='block border border-gray-300 p-2 rounded' type="text" value={description} onChange={handleDescriptionChange}/>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleBookingCreation}>Prenota</button>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'onClick={handleCloseModal}>Chiudi</button>
                </Modal>
            </div>
            : ''
        }
    </div>
}

export default BookingCalendar