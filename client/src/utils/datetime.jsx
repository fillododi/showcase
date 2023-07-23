const daysInWeekByDay = (day) => {
    let week = [];
    // Starting Monday not Sunday
    let first = ((day.getDate() - day.getDay()) + 1);
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(day.setDate(first++))
        );
    }
    return week;
}

const monthNames = () => {
    return ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
}

export {daysInWeekByDay, monthNames}