import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ date, onDateChange }) => {
  return (
      <Calendar
        showWeekNumbers 
        onChange={onDateChange}
        value={date}
      />
  )
};

export default CalendarComponent;
