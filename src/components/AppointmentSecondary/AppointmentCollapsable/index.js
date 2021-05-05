import { useState } from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Chip} from '@material-ui/core';
import AppointmentPreview from './AppointmentPreview';
import {labels} from '../../../constants';
import {getHourFromDate, formatPrettyDate} from 'services/utils';
import './styles.scss';

const AppointmentCollapsable = ({ entry, index, isNext, setShowEditDialog, setShowDeleteDialog }) => {
  const [expanded, setExpanded] = useState(false);
  const { control, price, treatment, technician } = entry;
  const isAppointment = entry.type === 'appointment';
  const { hour, minutes } = getHourFromDate(isAppointment ? entry.appointment : entry.date);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        className='appointment-collapsable'
        expanded={expanded === index || isNext}
        key={entry._id}
        onChange={handleChange(index)}
      >
        <AccordionSummary aria-controls='panel1bh-content' id='panel1bh-header'>
          <AppointmentPreview
            entry={entry}
            isNext={isNext}
            setShowEditDialog={setShowEditDialog}
            setShowDeleteDialog={setShowDeleteDialog}
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
