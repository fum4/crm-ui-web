import { AppointmentList } from '..';
import { ListEntry } from '..';
import './styles.scss';

const ClientList = ({ entries, onUpdate }) => {
  return (
    <div className='clients-container'>
      {
        entries?.map((entry, index) => (
          <ListEntry
            actionSuccessHandler={onUpdate}
            entry={entry}
            index={index}
            key={entry._id}>
            <AppointmentList
              entries={entry.appointments}
              onUpdate={onUpdate}
              parentId={entry._id}
              type='secondary' />
          </ListEntry>
        ))
      }
    </div>
  );
};

export default ClientList;
