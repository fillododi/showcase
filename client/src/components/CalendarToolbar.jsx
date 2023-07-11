import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/all.js";
import {monthNames} from "../utils/datetime.jsx";

const calendarToolbar = (view, onNavigate, time) => {
    const names = monthNames()
    if(view === 'week'){
        const week = time
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
    if(view === 'day'){
        const day = time
        return <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
            <button type="button" onClick={() => onNavigate('PREV')} className='arrowButton'>
                <MdArrowBackIos className='hover:scale-110'/>
            </button>
            <button type="button" onClick={() => onNavigate('TODAY')} className='todayButton'>
                {day.getDate()}  {names[day.getMonth()]}
            </button>
            <button type="button" onClick={() => onNavigate('NEXT')} className='arrowButton'>
                <MdArrowForwardIos  className='hover:scale-110'/>
            </button>
        </span>
        </div>
    }
    if(view === 'month'){
        const month = time
        return <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
            <button type="button" onClick={() => onNavigate('PREV')} className='arrowButton'>
                <MdArrowBackIos className='hover:scale-110'/>
            </button>
            <button type="button" onClick={() => onNavigate('TODAY')} className='todayButton'>
                {names[month.getMonth()]} {month.getFullYear()}
            </button>
            <button type="button" onClick={() => onNavigate('NEXT')} className='arrowButton'>
                <MdArrowForwardIos  className='hover:scale-110'/>
            </button>
        </span>
        </div>
    }
}

export default calendarToolbar