import { useEffect, useState } from 'react';
import { AppointmentList } from '..';
import ClientCollapsable from './ClientCollapsable';
import './styles.scss';

const ClientList = ({ entries, onUpdate }) => {
  const [ sortedEntries, setSortedEntries ] = useState([]);

  useEffect(() => {
    const sorted = entries.map((entry) => {
      const appointmentsAndControls = [...entry.appointments, ...entry.controls]
        .sort((a, b) => {
          if (a.type === 'control' && b.type === 'appointment') {
            return a.date < b.appointment ? -1 : 1;
          }

          if (a.type === 'appointment' && b.type === 'control') {
            return a.appointment < b.date ? -1 : 1;
          }

          if (a.type === 'appointment' && b.type === 'appointment') {
            return a.appointment < b.appointment ? -1 : 1;
          }

          if (a.type === 'control' && b.type === 'control') {
            return a.date < b.date ? -1 : 1;
          }
        }).reverse();

      return { ...entry, appointmentsAndControls };
    });

    setSortedEntries(sorted);
  }, [ entries ]);

  return (
    <div className='clients-container'>
      {
        sortedEntries?.map((entry, index) => (
          <ClientCollapsable
            actionSuccessHandler={onUpdate}
            entry={entry}
            index={index}
            key={entry._id}>
            <AppointmentList
              entries={entry.appointmentsAndControls}
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
