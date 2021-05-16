import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { AppointmentList, ClientDetails, ClientPreview } from 'components';
import { isMobile } from 'utils/helpers';
import { labels } from 'utils/constants';
import './styles.scss';

export const ClientCollapsable = ({ entry, isExpanded, onExpand }) => (
  <Accordion
    expanded={isExpanded}
    key={entry._id}
    onChange={() => onExpand(entry._id)}
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
