import { AppointmentPrimary, AppointmentSecondary } from '..';
import './styles.scss';

const AppointmentList = ({ entries, type, parentId }) => {
  return (
    <div className={`appointments-container-${type}`}>
      {
        entries?.map((entry) => {
          if (entry) {
            return type === 'primary' ? (
              <div className='appointments-container-primary__item'>
                <AppointmentPrimary entry={entry} key={entry._id} />
              </div>
            ) : (
              <div className='appointments-container-secondary__item'>
                <AppointmentSecondary entry={entry} key={entry._id} parentId={parentId} />
              </div>
            );
          }
        })
      }
    </div>
  );
};

export default AppointmentList;
