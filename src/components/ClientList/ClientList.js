import {AppointmentList} from '..';
import {ListEntry} from '..';
import './styles.scss';

const ClientList = ({ entries, refreshClients }) => {
  return (
    <div className='clients-container'>
      {entries?.map((entry, index) => (
        <ListEntry actionSuccessHandler={refreshClients} entry={entry} key={index}>
          <AppointmentList
            entries={entry.appointments}
            onUpdate={refreshClients}
            parentId={entry._id}
            type='secondary' />
        </ListEntry>
      ))}
    </div>
  );
};

export default ClientList;