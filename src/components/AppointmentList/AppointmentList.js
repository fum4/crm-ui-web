import {Appointment} from '..';
import './styles.scss';

const AppointmentList = ({ entries, type, parentId, onUpdate }) => {
  return (
    <div className='appointments-container'>
      {entries?.map((entry, index) => (
        <Appointment entry={entry} key={index} onUpdate={onUpdate} parentId={parentId} type={type} />
      ))}
    </div>
  );
};

export default AppointmentList;
