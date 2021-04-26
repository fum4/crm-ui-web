import { AppointmentList } from '..';
import ClientCollapsable from './ClientCollapsable';
import './styles.scss';

const ClientList = ({ entries, onUpdate }) => {
  return (
    <div className='clients-container'>
      {
        entries?.map((entry, index) => (
          <ClientCollapsable
            actionSuccessHandler={onUpdate}
            entry={entry}
            index={index}
            key={entry._id}>
            <AppointmentList
              entries={[...entry.appointments, ...entry.controls]}
              onUpdate={onUpdate}
              parentId={entry._id}
              type='secondary' />
          </ClientCollapsable>
        ))
      }
    </div>
  );
};

export default ClientList;
