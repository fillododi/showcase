import React, {useState, useEffect} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import Modal from 'react-modal'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './BookingCalendar/styles.css'
import moment from "moment/min/moment-with-locales";
import {daysInWeekByDay} from "../utils/datetime.jsx";

import calendarToolbar from './CalendarToolbar.jsx'

import useFetch from "../hooks/useFetch";
import useWindowDimensions from "../hooks/useWindowDimensions.js";
const BookingCalendar = () => {
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [prenotations, setPrenotations] = useState([])
    const [renderDate, setRenderDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [canCloseModal, setCanCloseModal] = useState(false)
    const [selectedSlots, setSelectedSlots] = useState({start: null, end: null})
    const [hoveredSlot, setHoveredSlot] = useState(null)
    const [mobileCalendarView, setMobileCalendarView] = useState('month')

    const {width, height} = useWindowDimensions()

    moment.locale('it')
    const localizer = momentLocalizer(moment)

    let {loading, data, error} = useFetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_STRAPI_PORT}/api/prenotazioni`)
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
        fetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_STRAPI_PORT}/api/prenotazioni`, {
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
        if(slot.getHours() < 9 || slot.getHours() > 18 || slot.getHours() > 13 && slot.getHours() < 16 ||
            new Date(slot) < new Date()                   //already passed
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
    const handleNavigateWeek = (action) => {
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
    const handleNavigate = (action) => {
        if(mobileCalendarView === 'day'){
            if(action == "PREV"){
                setRenderDate((prevDate) => {
                    const newDay = new Date(prevDate)
                    newDay.setDate(newDay.getDate()-1)
                    return newDay
                })
            }
            else if(action == "NEXT"){
                setRenderDate((prevDate) => {
                    const newDay = new Date(prevDate)
                    newDay.setDate(newDay.getDate()+1)
                    return newDay
                })
            }
            else if(action == "TODAY"){
                setRenderDate(new Date())
            }
            setSelectedSlots({start: null, end: null})
        }
        if(mobileCalendarView === 'month'){
            if(action == "PREV"){
                setRenderDate((prevDate) => {
                    const newMonth = new Date(prevDate)
                    newMonth.setMonth(newMonth.getMonth()-1)
                    return newMonth
                })
            }
            else if(action == "NEXT"){
                setRenderDate((prevDate) => {
                    const newMonth = new Date(prevDate)
                    newMonth.setMonth(newMonth.getMonth()+1)
                    return newMonth
                })
            }
            else if(action == "TODAY"){
                setRenderDate(new Date())
            }
            setSelectedSlots({start: null, end: null})
        }
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
        let borderTop = '0'
        let borderRight = '0'
        let borderBottom = '0'
        let borderLeft = '0'

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
            borderRight = '2px solid yellow'
            borderLeft = '2px solid yellow'
            if(isFirstSlot){
                borderTop = '2px solid yellow'
            }
            if(isLastSlot && !hoveredSlot){
                borderBottom = '2px solid yellow'
            }
        }

        if(!selectedSlots.start && slotStart.getTime() === hoveredSlot?.getTime()){
            console.log('a')
            borderRight = '2px solid yellow'
            borderLeft = '2px solid yellow'
            borderTop = '2px solid yellow'
            borderBottom = '2px solid yellow'
        }
        if(selectedSlots.start && !selectedSlots.end && getSlotsBetween(selectedSlots.start, hoveredSlot).some((slot) => slot.getTime() === slotStart.getTime())) {
            borderRight = '2px solid yellow'
            borderLeft = '2px solid yellow'
        }
        if(selectedSlots.start && !selectedSlots.end && slotStart.getTime() === hoveredSlot?.getTime()){
            borderRight = '2px solid yellow'
            borderLeft = '2px solid yellow'
            borderBottom = '2px solid yellow'
        }

        return {
            style: {
                backgroundColor: bgColor,
                borderTop: borderTop,
                borderRight: borderRight,
                borderLeft: borderLeft,
                borderBottom: borderBottom,
            },
            onMouseEnter: () => {
                if((!selectedSlots.start && validateBookingTimeSlot(slotStart)) || (!isInvalidSlotBetween(selectedSlots.start, moment(slotStart).add(30, 'm').toDate()) && slotStart.getTime() > selectedSlots.start.getTime())){
                    setHoveredSlot(slotStart)
                }
            },
            onMouseLeave: () => {
                setHoveredSlot(null)
            }
        }
    }

    const getMonthProps = (daySlot) => {
        let bgColor = ''
        if(daySlot < new Date() - 1){
            bgColor = 'lightgray'
        } else {
            let isValid = false
            let currentSlot = new Date(daySlot)
            let nextDay = new Date(daySlot)
            nextDay.setDate(nextDay.getDate() + 1)
            nextDay.setHours(0)
            nextDay.setMinutes(0)
            while(currentSlot <= nextDay){
                if(validateBookingTimeSlot(new Date(currentSlot)) && !prenotations.some(prenotation => new Date(prenotation.attributes.inizio) <= currentSlot && currentSlot < new Date(prenotation.attributes.fine))){
                    isValid = true
                }
                currentSlot.setMinutes(currentSlot.getMinutes() + 30)
            }
            if(isValid){
                bgColor = 'lightblue'
            } else {
                bgColor = 'lightgray'
            }
        }
        return {
            style: {
                backgroundColor: bgColor
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
                setCanCloseModal(false)
                setShowModal(true)
                setTimeout(()=>{
                    setCanCloseModal(true)
                }, 100) //senza questo quando si apre il modale in una posizione in cui cliccando si chiuderebbe, si apre e si chiude subito
            }
        }
    }
    const handleDaySelection = (dayInfo) => {
        setRenderDate(dayInfo.start)
        setMobileCalendarView('day')
        setSelectedSlots({start: null, end: null})
    }
    const handleMonthSwitch = () => {
        setRenderDate(new Date())
        setMobileCalendarView('month')
        setSelectedSlots({start: null, end: null})
    }
    const handleBookingCreation = () => {
        if(canCloseModal){
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
    }

    const getSelectedDay = () => {
        return selectedSlots.start?.getDay()
    }

    const getModalStyle = () => {
        const modalWidth = 300
        const modalHeight = 300
        return {
            content: {
                margin: "auto",
                width: `${modalWidth}px`,
                height: `${modalHeight}px`,
            }
        }
    }

    const handleCloseModal = () => {
        if(canCloseModal){
            setShowModal(false)
            setSelectedSlots({start: null, end: null})
            setEmail('')
            setDescription('')
        }
    }

    return <div className='container mx-auto p-4 max-w-[1240px] mt-[80px]'>
        {prenotations?
            <div>
                {/* Render the React Big Calendar */}
                <div className='calendar-wrapper h-[35rem]'>
                    {width >= 768?
                        <Calendar events={prenotations} localizer={localizer}
                                  startAccessor={prenotation => new Date(prenotation.attributes.inizio)}
                                  endAccessor={prenotation => new Date(prenotation.attributes.fine)}
                                  view={"week"} min={new Date(0,0,0,9,0,0)}
                                  max={new Date(0,0,0,19,0,0)}
                                  components={{
                                      toolbar: (props) => calendarToolbar("week", handleNavigateWeek, daysInWeekByDay(new Date(renderDate)))
                                  }}
                                  date={renderDate} selectable='ignoreEvents' onSelectSlot={handleSlotSelection}
                                  slotPropGetter={getSlotProps} dayLayoutAlgorithm='no-overlap' longPressThreshold={10}
                        />
                        :
                        <div className='flex flex-col justify-center gap-y-4 h-[35rem] px-4'>
                            <Calendar localizer={localizer} events={mobileCalendarView === 'day'? prenotations: []}
                                      startAccessor={prenotation => new Date(prenotation.attributes.inizio)}
                                      endAccessor={prenotation => new Date(prenotation.attributes.fine)}
                                      view={mobileCalendarView} min={new Date(0,0,0,9,0,0)}
                                      max={new Date(0,0,0,19,0,0)}
                                      date={renderDate} selectable='ignoreEvents'
                                      onSelectSlot={mobileCalendarView === 'month'? handleDaySelection: handleSlotSelection}
                                      longPressThreshold={10}
                                      dayLayoutAlgorithm='no-overlap'
                                      components={{
                                          toolbar: (props) => calendarToolbar(mobileCalendarView, handleNavigate, renderDate)
                                      }}
                                      slotPropGetter={getSlotProps} dayPropGetter={getMonthProps}
                            />
                            {mobileCalendarView === 'day' &&
                                <button className='bg-transparent border-gray-400 rounded-none text-black p-1' onClick={handleMonthSwitch}>Torna al mese</button>
                            }
                        </div>
                    }
                </div>
                <div className='mx-4'>
                    <br/>
                    <p>*Gli orari sono personalizzabili all'interno delle richieste</p>
                </div>
                <Modal isOpen={showModal} onRequestClose={handleCloseModal} contentLabel="Prenota" style={getModalStyle()}>
                    <form className='grid grid-cols-1 content-around h-full' onSubmit={handleBookingCreation}>
                            <div>
                                <h2 className='font-bold'>Dettagli della prenotazione</h2>
                                <p>{selectedSlots.start?.getHours()}:{selectedSlots.start?.getMinutes().toString().padStart(2, '0')} - {selectedSlots.end?.getHours()}:{selectedSlots.end?.getMinutes().toString().padStart(2, '0')}</p>
                            </div>
                            <div>
                                <label className='font-bold'>E-Mail:</label>
                                <input className='block border border-gray-300 p-2 rounded' type="email" value={email} required onChange={handleEmailChange}/>
                            </div>
                            <div>
                                <label className='font-bold'>Richieste:</label>
                                <input className='block border border-gray-300 p-2 rounded' type="text" value={description} required onChange={handleDescriptionChange}/>
                            </div>
                            <div className='flex flex-row gap-4 mt-4'>
                                <button className='w-2/3 bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded hover:text-white' type='submit'>Prenota</button>
                                <button className='w-1/6 bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded hover:text-white'onClick={handleCloseModal}>X</button>
                            </div>
                    </form>
                </Modal>
            </div>
            : ''
        }
    </div>
}

export default BookingCalendar