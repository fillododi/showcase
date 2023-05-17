import React, {useState, useEffect} from "react";
import useFetch from "../hooks/useFetch";
const BookingCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [prenotations, setPrenotations] = useState([])

    let {loading, data, error} = useFetch('http://localhost:1337/api/prenotazioni')

    useEffect(()=>{
        setPrenotations(data)
        console.log(prenotations)
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

    return <div>
        <h2>Calendario</h2>
        <div>
            <label>Data:</label>
            <input type="date" value={selectedDate} onChange={handleDateChange}/>
        </div>
        <div>
            <label>Inizio:</label>
            <input type="time" value={startTime} onChange={handleStartTimeChange}/>
        </div>
        <div>
            <label>Fine:</label>
            <input type="time" value={endTime} onChange={handleEndTimeChange}/>
        </div>
        <div>
            <label>E-Mail:</label>
            <input type="email" value={email} onChange={handleEmailChange}/>
        </div>
        <div>
            <label>Descrizione:</label>
            <input type="text" value={description} onChange={handleDescriptionChange}/>
        </div>
        <button onClick={handleBookingCreation}>Prenota</button>
    </div>
}

export default BookingCalendar