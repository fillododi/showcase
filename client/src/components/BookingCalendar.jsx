import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"

import useFetch from "../hooks/useFetch";
const BookingCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [prenotations, setPrenotations] = useState([])
    const [renderDate, setRenderDate] = useState(new Date())
    const [week, setWeek] = useState([])

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
    }, [data])
    useEffect(()=>{
        try{
            renderWeek()
        }
        catch (e) {
            console.log(e)
        }
    }, [prenotations])


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
                    inizio: `${booking.date}T${booking.startTime}:00.000Z`,
                    fine: `${booking.date}T${booking.endTime}:00.000Z`,
                    accettata: 0
                }
            })
        })
    }

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
    }
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
    }
    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleBookingCreation = () => {
        const booking = {
            date: selectedDate,
            startTime: startTime,
            endTime: endTime,
            email: email,
            description: description
        }

        requestBooking(booking)
    }

    const renderWeek = () => {
        const startDate = new Date(renderDate)
        startDate.setDate(startDate.getDate() - startDate.getDay())
        const weekInfo = []
        for(let i = 0; i<7; i++) {
            const currentDate = new Date(startDate)
            currentDate.setDate(currentDate.getDate() + i)
            const dailyBookings = prenotations.filter(
                prenotation => new Date(prenotation.attributes.inizio).toDateString() === currentDate.toDateString()
            )

            weekInfo.push([currentDate, dailyBookings])
        }

        if(!(JSON.stringify(week) == JSON.stringify(weekInfo))){
            setWeek(weekInfo)
        }
    }

    return <div className='container mx-auto p-4'>
        <h2 className='text-2x1 font-bold mb-4'>Calendario</h2>
        <div className='grid grid-cols-7 gap-4 mb-4'>
            <div>
                <label className='font-bold'>Data:</label>
                <input className='block border border-gray-300 p-2 rounded' type="date" value={selectedDate} onChange={handleDateChange}/>
            </div>
            <div>
                <label className='font-bold'>Inizio:</label>
                <input className='block border border-gray-300 p-2 rounded' type="time" value={startTime} onChange={handleStartTimeChange}/>
            </div>
            <div>
                <label className='font-bold'>Fine:</label>
                <input className='block border border-gray-300 p-2 rounded' type="time" value={endTime} onChange={handleEndTimeChange}/>
            </div>
            <div>
                <label className='font-bold'>E-Mail:</label>
                <input className='block border border-gray-300 p-2 rounded' type="email" value={email} onChange={handleEmailChange}/>
            </div>
            <div>
                <label className='font-bold'>Descrizione:</label>
                <input className='block border border-gray-300 p-2 rounded' type="text" value={description} onChange={handleDescriptionChange}/>
            </div>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleBookingCreation}>Prenota</button>
        {prenotations?
            <div>
                <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" firstDay={1}
                      events={prenotations.map((prenotation) => ({
                          start: prenotation.attributes.inizio,
                          end: prenotation.attributes.fine
                      }))} eventBackgroundColor='#ff4030' eventBorderColor='red' displayEventTime={false}
                      businessHours={[
                          {daysOfWeek: [1,2,3,4,5], startTime: '13:00', endTime: '14:00'},
                          {daysOfWeek: [1,2,3,4,5], startTime: '18:30', endTime: '24:00'},
                          {daysOfWeek: [6, 0], startTime: '08:00', endTime: '24:00'}
                      ]} allDaySlot={false} slotLabelFormat={{hour: '2-digit', minute: '2-digit', meridiem: false, hour12: false}}
                      headerToolbar={{start: '', end: 'today prev,next'}} buttonText={{today: 'Oggi'}} locale={'it'}
                />
            </div>
            : ''
        }
    </div>
}

export default BookingCalendar