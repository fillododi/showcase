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
    const [hoveredSlot, setHoveredSlot] = useState(null)

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

    const isInvalidSlotBetween = (start, end) => {
        let currentSlot = new Date(start)
        while (currentSlot < end) {
            if(!validateBookingTimeSlot(currentSlot) || prenotations.some(prenotation => currentSlot.getTime() === new Date(prenotation.attributes.inizio).getTime())){
                return true
            }
            currentSlot.setMinutes(currentSlot.getMinutes() + 30)
        }
        return false
    }

    const getSlotsBetween = (start, end) => {
        const timeSlots = []
        let currentSlot = new Date(start)
        while (currentSlot < end) {
            timeSlots.push(new Date(currentSlot))
            currentSlot.setMinutes(currentSlot.getMinutes() + 30)
        }
        return timeSlots
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
        setSelectedSlots({start: null, end: null})
    }

    const getHighlightedSlots = () => {
        if(selectedSlots.start && !selectedSlots.end){
            return [selectedSlots.start]
        } else if(selectedSlots.start && selectedSlots.end){
            return getSlotsBetween(selectedSlots.start, selectedSlots.end)
        } else {
            return []
        }
    }

    const getSlotProps = (slotStart) => {
        let bgColor = ''
        let borderTop = ''
        let borderRight = ''
        let borderBottom = ''
        let borderLeft = ''

        if(!validateBookingTimeSlot(slotStart)){
            bgColor = 'lightgray'
        } else {
            bgColor = 'lightblue'
        }

        let highlightedSlots = getHighlightedSlots()
        const toHighlight = highlightedSlots.some((slot) => slot.getTime() === slotStart.getTime())
        const isFirstSlot = slotStart.getTime() === highlightedSlots[0]?.getTime()
        const isLastSlot = slotStart.getTime() === highlightedSlots[highlightedSlots.length - 1]?.getTime()

        if(toHighlight){
            borderRight = '1px solid red'
            borderLeft = '1px solid red'
            if(isFirstSlot){
                borderTop = '1px solid red'
            }
            if(isLastSlot && !hoveredSlot){
                borderBottom = '1px solid red'
            }
        }

        if(!selectedSlots.start && slotStart.getTime() === hoveredSlot?.getTime()){
            borderRight = '1px solid red'
            borderLeft = '1px solid red'
            borderTop = '1px solid red'
            borderBottom = '1px solid red'
        }
        if(selectedSlots.start && !selectedSlots.end && getSlotsBetween(selectedSlots.start, hoveredSlot).some((slot) => slot.getTime() === slotStart.getTime())) {
            borderRight = '1px solid red'
            borderLeft = '1px solid red'
        }
        if(selectedSlots.start && !selectedSlots.end && slotStart.getTime() === hoveredSlot?.getTime()){
            borderRight = '1px solid red'
            borderLeft = '1px solid red'
            borderBottom = '1px solid red'
        }

        return {
            style: {
                backgroundColor: bgColor,
                borderTop: borderTop,
                borderRight: borderRight,
                borderLeft: borderLeft,
                borderBottom: borderBottom
            },
            onMouseEnter: () => {
                if(!selectedSlots.start || (!isInvalidSlotBetween(selectedSlots.start, slotStart) && slotStart.getTime() > selectedSlots.start.getTime()))
                setHoveredSlot(slotStart)
            },
            onMouseLeave: () => {
                setHoveredSlot(null)
            }
        }
    }
    const handleSlotSelection = (slotInfo) => {
        const now = new Date()
        if(validateBookingTimeSlot(slotInfo.start) && slotInfo.start.getTime() > now.getTime()){
            if(!selectedSlots.start ||
                !(selectedSlots.start.getDate() === slotInfo.start.getDate()) ||
                selectedSlots.start.getHours() >= slotInfo.end.getHours() ||
                isInvalidSlotBetween(selectedSlots.start, slotInfo.end)
            ){
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
        setSelectedSlots({start: null, end: null})
        setEmail('')
        setDescription('')
        setShowModal(false)
    }

    const getSelectedDay = () => {
        return selectedSlots.start?.getDay()
    }

    const getModalStyle = () => {
        let dayNumber = getSelectedDay()
        if(dayNumber === 0) {
            dayNumber = 7
        }
        const calendarWrapper = document.getElementsByClassName('calendar-wrapper')[0]
        const calendarRect = calendarWrapper?.getBoundingClientRect()
        const dayWidth = calendarRect?.width/7
        const modalWidth = 300
        const modalHeight = 300

        const left = calendarRect?.left + (dayWidth * dayNumber)
        const maxLeft = calendarRect?.left + calendarRect?.width - modalWidth
        const adjustedLeft = left > maxLeft? maxLeft: left

        return {
            content: {
                top: "50%",
                left: `${adjustedLeft}px`,
                width: `${modalWidth}px`,
                height: `${modalHeight}px`,
                transform: "translate(0%, -50%)",
            }
        }
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
                <div className='calendar-wrapper'>
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
                </div>
                <Modal isOpen={showModal} onRequestClose={handleCloseModal} contentLabel="Prenota" style={getModalStyle()}>
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