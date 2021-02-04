import {AppointmentList} from '..';
import {ListEntry} from '..';
import './styles.scss';

const ClientList = ({entries}) => {
  return (
    <div className='clients-container'>
      {entries?.map((entry, index) => (
        <ListEntry key={index} entry={entry}>
          <AppointmentList entries={entry.appointments} parentId={entry._id} type='secondary' />
        </ListEntry>
      ))}
    </div>
  );
};

export default ClientList;
