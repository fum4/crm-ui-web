import { useState } from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Chip} from '@material-ui/core';
import AppointmentPreview from './AppointmentPreview';
import {labels} from '../../../constants';
import {getHourFromDate, formatPrettyDate} from 'services/utils';
import './styles.scss';

const AppointmentCollapsable = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { control, price, treatment, technician } = props.entry;
  const isAppointment = props.entry.type === 'appointment';
  const { hour, minutes } = getHourFromDate(isAppointment ? props.entry.appointment : props.entry.date);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        className='appointment-collapsable'
        expanded={expanded === props.index || props.isNext}
        key={props.entry._id}
        onChange={handleChange(props.index)}
      >
        <AccordionSummary aria-controls='panel1bh-content' id='panel1bh-header'>
          <AppointmentPreview
            entry={props.entry}
            isNext={props.isNext}
            setShowEditDialog={props.setShowEditDialog}
            setShowDeleteDialog={props.setShowDeleteDialog}
          />
        </AccordionSummary>
        <AccordionDetails>
          <div className='info' component='p' variant='body2'>
            <Chip
                className='info__label'
                // icon={<AccessTime />}
                label={labels.HOUR}
                size='small'
            />
            <span className='info__text'>{ `${hour}:${minutes}` }</span>
          </div>
          {
            treatment && (
              <div className='info' component='p' variant='body2'>
                <Chip
                  className='info__label'
                  // icon={<LocalHospital />}
                  label={labels.TREATMENT}
                  size='small'
                />
                <span className='info__text'>{treatment}</span>
              </div>
            )
          }
          {
            isAppointment && control && (
              <div className='info' component='p' variant='body2'>
                <Chip
                  className='info__label'
                  // icon={<Timelapse />}
                  label={labels.CONTROL}
                  size='small'
                />
                <span className='info__text'>{formatPrettyDate(control)}</span>
              </div>
            )
          }
          {
            technician && (
              <div className='info' component='p' variant='body2'>
                <Chip
                  className='info__label'
                  // icon={<Build />}
                  label={labels.TECHNICIAN}
                  size='small'
                />
                <span className='info__text'>{technician}</span>
              </div>
            )
          }
          {
            price && (
              <div className='info' component='p' variant='body2'>
                <Chip
                  className='info__label'
                  // icon={<AttachMoney />}
                  label={labels.PRICE}
                  size='small'
                />
                <span className='info__text'>{price}</span>
              </div>
            )
          }
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AppointmentCollapsable;
