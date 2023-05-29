import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const calendarToolbar = (onNavigate) => {
    return <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
            <button type="button" onClick={() => onNavigate('PREV')}>
                Precedente
            </button>
            <button type="button" onClick={() => onNavigate('TODAY')}>
                Oggi
            </button>
            <button type="button" onClick={() => onNavigate('NEXT')}>
                Successiva
            </button>
        </span>
    </div>
}

export default calendarToolbar