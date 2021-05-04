import { useState, useEffect, Fragment } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons';
import { AppointmentPrimary, AppointmentSecondary } from '..';
import { labels } from '../../constants';
import { isMobile } from 'services/utils';
import moment from 'moment';
import './styles.scss';

const AppointmentList = ({ entries, type, parentId }) => {
  const [shouldDisplayInactive, setShouldDisplayInactive] = useState(false);
  const [sortedEntries, setSortedEntries] = useState([]);
  const [nextAppointment, setNextAppointment] = useState();

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DDTHH:mm');

    sortedEntries.forEach((entry, index) => {
      const entryDate = entry.type === 'appointment'
        ? entry.appointment
        : entry.date;

      if (entryDate > currentDate) {
        setNextAppointment(index);
      }
    })
  }, [ sortedEntries, nextAppointment ]);

  useEffect(() => {
    const sorted = entries.slice().sort((a, b) => {
      if (a.type === 'control' && b.type === 'appointment') {
        return a.date < b.appointment ? -1 : 1;
      }

      if (a.type === 'appointment' && b.type === 'control') {
        return a.appointment < b.date ? -1 : 1;
      }

      if (a.type === 'appointment' && b.type === 'appointment') {
        return a.appointment < b.appointment ? -1 : 1;
      }

      if (a.type === 'control' && b.type === 'control') {
        return a.date < b.date ? -1 : 1;
      }
    });

    setSortedEntries(type === 'primary' ? sorted : sorted.reverse());
  }, [ type, entries ]);

  const buildHeader = (entry, index) => {
    const previousEntry = entries[index - 1];
    const currentItemDateAndTime = entry.type === 'appointment' ? entry.appointment : entry.date;
    const previousEntryDateAndTime =
      previousEntry && (previousEntry.type === 'appointment' ? previousEntry.appointment : previousEntry.date);
    const currentItemDate = currentItemDateAndTime.slice(0, currentItemDateAndTime.indexOf('T'));
    const previousEntryDate =
      previousEntryDateAndTime && previousEntryDateAndTime.slice(0, previousEntryDateAndTime.indexOf('T'));
    const isFirstEntry = !previousEntry || !isActive(previousEntry) && isActive(entry);
    const isDifferentDay = currentItemDate !== previousEntryDate;
    const shouldDisplayHeader = isFirstEntry || isDifferentDay;

    if (shouldDisplayHeader) {
      const currentDate = moment(currentItemDate);
      const currentMonth = currentDate.format('MMMM').toUpperCase();
      const currentDayText = currentDate.format('dddd').toUpperCase();
      const currentDayNumber = currentDate.date();

      return (
        <div className='appointments-container-primary__day-header'>
          <p className='appointments-container-primary__day-header__day'>{`${labels.DAYS[currentDayText]},`}</p>
          <p className='appointments-container-primary__day-header__date'>{`${currentDayNumber} ${labels.MONTHS[currentMonth]}`}</p>
        </div>
      );
    }
  };

  const isActive = (entry) => {
    const currentDate = moment().format('YYYY-MM-DDTHH:mm');
    const entryDate = entry.type === 'appointment' ? entry.appointment : entry.date;

    return entryDate > currentDate;
  };

  const shouldDisplayEntry = (entry) => {
    return entry && (shouldDisplayInactive || isActive(entry));
  };

  return (
    <div className={`appointments-container-${type}`}>
      <FormControlLabel
        checked={shouldDisplayInactive}
        className={`appointments-container-${type}__switch`}
        control={<Switch color='primary' />}
        label={labels.SHOW_INACTIVE_APPOINTMENTS}
        labelPlacement={isMobile() ? undefined : 'start'}
        onChange={() => setShouldDisplayInactive(!shouldDisplayInactive)}
      />
      {sortedEntries?.map((entry, index) => {
        if (shouldDisplayEntry(entry)) {
          return type === 'primary' ? (
            <Fragment key={entry._id}>
              {buildHeader(entry, index)}
              <div className='appointments-container-primary__item'>
                <AppointmentPrimary entry={entry} />
              </div>
            </Fragment>
          ) : (
            <div className='appointments-container-secondary__item' key={entry._id}>
              <AppointmentSecondary isNext={index === nextAppointment} entry={entry} parentId={parentId} />
            </div>
          );
        }
      })}
      {type === 'primary' && (
        <div className={`appointments-container-${type}__no-active-appointments`}>
          <AssignmentTurnedIn color='primary' fontSize='large' />
          <p>{labels.NO_ACTIVE_APPOINTMENTS}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
