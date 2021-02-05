import {Fragment, useState} from 'react';
import {Accordion, AccordionDetails} from '@material-ui/core';
import {ClientPreview} from '../';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.scss';

const ListEntry = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Fragment>
      <Accordion
        expandIcon={<ExpandMoreIcon />}
        expanded={expanded === props.key}
        key={props.key}
        onChange={handleChange(props.key)}>
        <AccordionSummary aria-controls='panel1bh-content' id='panel1bh-header'>
          <ClientPreview entry={props.entry} />
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default ListEntry;
