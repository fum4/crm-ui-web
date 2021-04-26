import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ClientPreview from './ClientPreview';
import './styles.scss';

const ClientCollapsable = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === props.index}
        key={props.entry._id}
        onChange={handleChange(props.index)}
      >
        <AccordionSummary aria-controls='panel1bh-content' id='panel1bh-header'>
          <ClientPreview entry={props.entry} isExpanded={expanded === props.index} onUpdate={props.actionSuccessHandler} />
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default ClientCollapsable;