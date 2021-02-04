import {Appointment} from '..';
import './styles.scss';

const AppointmentList = ({entries, type, parentId}) => {
  return (
    <div className='appointments-container'>
      {entries?.map((entry, index) => (
        <Appointment key={index} entry={entry} parentId={parentId} type={type} />
      ))}
    </div>
  );
};

export default AppointmentList;
