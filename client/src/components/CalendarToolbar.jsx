import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/all.js";
import {monthNames} from "../utils/datetime.jsx";

const calendarToolbar = (onNavigate, week) => {
    const names = monthNames()
    console.log(week[0].getMonth())
    return <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
            <button type="button" onClick={() => onNavigate('PREV')} className='arrowButton'>
                <MdArrowBackIos className='hover:scale-110'/>
            </button>
            <button type="button" onClick={() => onNavigate('TODAY')} className='todayButton'>
                {week[0].getDate()} - {week[6].getDate()} {names[week[0].getMonth()]}
            </button>
            <button type="button" onClick={() => onNavigate('NEXT')} className='arrowButton'>
                <MdArrowForwardIos  className='hover:scale-110'/>
            </button>
        </span>
    </div>
}

export default calendarToolbar