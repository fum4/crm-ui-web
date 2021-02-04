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
        key={props.key}
        expandIcon={<ExpandMoreIcon />}
        onChange={handleChange(props.key)}
        expanded={expanded === props.key}>
        <AccordionSummary id='panel1bh-header' aria-controls='panel1bh-content'>
          <ClientPreview entry={props.entry} />
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default ListEntry;
