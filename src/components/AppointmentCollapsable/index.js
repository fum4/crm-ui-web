import { useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Chip } from '@material-ui/core';
import { AppointmentPreview } from 'components';
import { labels } from 'utils/constants';
import { getHourFromDate, formatPrettyDate } from 'utils/helpers';
import './styles.scss';

export const AppointmentCollapsable = ({ entry, isNext, setShowEditDialog, setShowDeleteDialog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { hour, minutes } = useMemo(() =>
    getHourFromDate(entry.type === 'appointment' ? entry.appointment : entry.date)
  , [ entry ]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion
      className='appointment-collapsable'
      expanded={isExpanded || isNext}
      key={entry._id}
      onChange={toggleExpanded}
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
        <div className='info'>
          <Chip
              className='info__label'
              // icon={<AccessTime />}
              label={labels.HOUR}
              size='small'
          />
          <span className='info__text'>{ `${hour}:${minutes}` }</span>
        </div>
        {
          entry.treatment && (
            <div className='info'>
              <Chip
                className='info__label'
                // icon={<LocalHospital />}
                label={labels.TREATMENT}
                size='small'
              />
              <span className='info__text'>{entry.treatment}</span>
            </div>
          )
        }
        {
          entry.type === 'appointment' && entry.control && (
            <div className='info'>
              <Chip
                className='info__label'
                // icon={<Timelapse />}
                label={labels.CONTROL}
                size='small'
              />
              <span className='info__text'>{formatPrettyDate(entry.control)}</span>
            </div>
          )
        }
        {
          entry.technician && (
            <div className='info'>
              <Chip
                className='info__label'
                // icon={<Build />}
                label={labels.TECHNICIAN}
                size='small'
              />
              <span className='info__text'>{entry.technician}</span>
            </div>
          )
        }
        {
          entry.price && (
            <div className='info'>
              <Chip
                className='info__label'
                // icon={<AttachMoney />}
                label={labels.PRICE}
                size='small'
              />
              <span className='info__text'>{entry.price}</span>
            </div>
          )
        }
      </AccordionDetails>
    </Accordion>
  );
};
