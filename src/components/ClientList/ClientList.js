import { useState } from 'react';
import { labels } from '../../constants';
import { isMobile } from 'services/utils';
import { PeopleAlt } from '@material-ui/icons';
import ClientCollapsable from './ClientCollapsable';
import './styles.scss';

const ClientList = ({ entries }) => {
  const [expanded, setExpanded] = useState(null);
  const handleExpand = (panelId) => setExpanded(panelId === expanded ? null : panelId);

  return (
    <div className='clients-container'>
      {
        isMobile() && (
          <div className='clients-container__title'>
            <PeopleAlt />
            <h1>{ labels.CLIENTS }</h1>
          </div>
        )
      }
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

export default ClientList;
