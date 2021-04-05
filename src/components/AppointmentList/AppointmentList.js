import { useState, useEffect } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons';
import { AppointmentPrimary, AppointmentSecondary } from '..';
import { labels } from '../../constants';
import moment from 'moment';
import './styles.scss';

const AppointmentList = ({ entries, type, parentId }) => {
  const [shouldDisplayInactive, setShouldDisplayInactive] = useState(false);

  const buildHeader = (entry, index) => {
    const previousItem = entries[index-1];
    const currentItemDateAndTime = entry.type === 'appointment' ? entry.appointment : entry.date;
    const previousItemDateAndTime = previousItem && (previousItem.type === 'appointment' ? previousItem.appointment : previousItem.date);
    const currentItemDate = currentItemDateAndTime.slice(0, currentItemDateAndTime.indexOf('T'));
    const previousItemDate = previousItemDateAndTime && previousItemDateAndTime.slice(0, previousItemDateAndTime.indexOf('T'));
    const shouldDisplayHeader = !previousItem || currentItemDate !== previousItemDate;

    if (shouldDisplayHeader) {
      const currentDate = moment(currentItemDate);
      const currentMonth = currentDate.format('MMMM').toUpperCase();
      const currentDayText = currentDate.format('dddd').toUpperCase();
      const currentDayNumber = +currentDate.format('d') + 1; // TODO: refactor this

      return (
        <div className='appointments-container-primary__day-header'>
          <p className='appointments-container-primary__day-header__day'>{ `${labels.DAYS[currentDayText]},` }</p>
          <p className='appointments-container-primary__day-header__date'>{ `${currentDayNumber} ${labels.MONTHS[currentMonth]}` }</p>
        </div>
      )
    }
  };

  const isActive = (entry) => {
    const currentDate = moment().format('YYYY-MM-DThh:mm');
    const entryDate = entry.type === 'appointment' ? entry.appointment : entry.date;

    return entryDate > currentDate;
  };

  const shouldDisplayEntry = (entry) => {
    return entry && (shouldDisplayInactive || isActive(entry));
  }

  useEffect(() => {
    setShouldDisplayInactive(type === 'secondary');
  }, [type]);

  return (
    <div className={`appointments-container-${type}`}>
      <FormControlLabel
        checked={shouldDisplayInactive}
        className={`appointments-container-${type}__switch`}
        control={<Switch color='primary' />}
        label={labels.SHOW_INACTIVE_APPOINTMENTS}
        labelPlacement='start'
        onChange={() => setShouldDisplayInactive(!shouldDisplayInactive)}
      />
      {
        entries?.map((entry, index) => {
          if (shouldDisplayEntry(entry)) {
            return type === 'primary' ? (
              <>
                { buildHeader(entry, index) }
                <div className='appointments-container-primary__item'>
                  <AppointmentPrimary entry={entry} key={entry._id} />
                </div>
              </>
            ) : (
              <div className='appointments-container-secondary__item'>
                <AppointmentSecondary entry={entry} key={entry._id} parentId={parentId} />
              </div>
            );
          }
        })
      }
      {
        type === 'primary' && (
          <div className={`appointments-container-${type}__no-active-appointments`}>
            <AssignmentTurnedIn color='primary' fontSize='large' />
            <p>{ labels.NO_ACTIVE_APPOINTMENTS }</p>
          </div>
        )
      }
    </div>
  );
};

export default AppointmentList;
