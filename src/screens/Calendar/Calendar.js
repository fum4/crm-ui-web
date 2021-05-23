import {useState, useEffect, useMemo} from 'react';
import { Calendar as ReactCalendar } from 'react-calendar'
import { useAppointments } from 'store';
import { useSelector } from 'react-redux';
import { AppointmentCalendarItem, AppointmentsPlaceholder } from 'components';
import { getHourFromDate } from 'utils/helpers';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './styles.scss';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [filteredAppointments, setFilteredAppointments] = useState();
  const isAuthenticated = useSelector((state) => state.general.isAuthenticated);
  const appointments = useAppointments(isAuthenticated);

  const handleCalendarChange = (value) => setSelectedDate(moment(value).format('YYYY-MM-DD'));
  const renderAppointment = (appointment) => {
    const { hour, minutes } = getHourFromDate(appointment.type === 'appointment' ? appointment.appointment : appointment.date)

    return (
      <div className='row'>
        <div className='time'>
          <span>{ `${hour}:${minutes}` }</span>
        </div>
        <AppointmentCalendarItem entry={appointment} key={appointment._id} />
      </div>
    );
  }

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const date = appointment.type === 'appointment' ? appointment.appointment : appointment.date;

      return moment(date).format('YYYY-MM-DD') === selectedDate;
    })

    setFilteredAppointments(filtered);
  }, [ selectedDate, appointments ]);


  return (
    <div className='appointments-calendar-container'>
      <ReactCalendar onChange={handleCalendarChange} />
      {
        filteredAppointments?.length
          ? filteredAppointments.map(renderAppointment)
          : <AppointmentsPlaceholder />
      }
    </div>
  );
}

export default Calendar;
