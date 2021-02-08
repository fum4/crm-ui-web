import { Appointment } from '..';
import './styles.scss';

const AppointmentList = ({ entries, type, parentId, onUpdate }) => {
  return (
    <div className='appointments-container'>
      {
        entries?.map((entry) => (
          <Appointment
            entry={entry}
            key={entry.date || entry.appointment.date}
            onUpdate={onUpdate}
            parentId={parentId}
            type={type} />
        ))
      }
    </div>
  );
};

export default AppointmentList;
