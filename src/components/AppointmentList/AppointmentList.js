import {Appointment} from '..';
import './styles.scss';

const AppointmentList = ({entries, type, parentId}) => {
  return (
    <div className="appointments-container">
      {entries?.map((entry, index) => (
        <Appointment
          key={index}
          type={type}
          entry={entry}
          parentId={parentId}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
