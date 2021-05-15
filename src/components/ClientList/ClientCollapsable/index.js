import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { AppointmentList } from '../../';
import { labels } from '../../../constants';
import { isMobile } from 'services/utils';
import ClientDetails from './ClientDetails';
import ClientPreview from './ClientPreview';
import './styles.scss';


const ClientCollapsable = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion
      expanded={isExpanded}
      key={entry._id}
      onChange={toggleExpanded}
    >
      <AccordionSummary aria-controls='panel1bh-content' id='panel1bh-header'>
        <ClientPreview entry={entry} />
      </AccordionSummary>
      <AccordionDetails className='client-content'>
        {
          isMobile() && <h4>{ labels.DETAILS }</h4>
        }
        <ClientDetails entry={entry} />
        {
          isMobile() && <h4>{ labels.APPOINTMENTS }</h4>
        }
        <AppointmentList
          entries={[...entry.appointments, ...entry.controls]}
          type='secondary'
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ClientCollapsable;
