import { useState } from 'react';
import { ClientCollapsable } from 'components';
import './styles.scss';

export const ClientList = ({ entries }) => {
  const [expanded, setExpanded] = useState(null);
  const handleExpand = (panelId) => setExpanded(panelId === expanded ? null : panelId);

  return (
    <div className='clients-container'>
      {
        entries?.map((entry) => (
          <ClientCollapsable
            isExpanded={entry._id === expanded}
            onExpand={handleExpand}
            entry={entry}
            key={entry._id}
          />
        ))
      }
    </div>
  );
};
