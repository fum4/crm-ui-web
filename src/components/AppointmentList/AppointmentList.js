import { AppointmentPrimary, AppointmentSecondary } from '..';
import './styles.scss';

const AppointmentList = ({ entries, type, parentId, onUpdate }) => {
  return (
    <div className='appointments-container'>
      {entries?.map((entry) => {
        return type === 'primary' ? (
          <AppointmentPrimary entry={entry} key={entry.appointment._id} />
        ) : (
          <AppointmentSecondary entry={entry} key={entry._id} onUpdate={onUpdate} parentId={parentId} />
        );
      })}
    </div>
  );
};

export default AppointmentList;
