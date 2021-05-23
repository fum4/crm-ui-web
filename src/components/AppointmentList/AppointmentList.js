import { useState, useEffect, Fragment } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { AppointmentPrimary, AppointmentSecondary, AppointmentsPlaceholder } from 'components';
import { isMobile, isActiveAppointment } from 'utils/helpers';
import { labels } from 'utils/constants';
import moment from 'moment';
import './styles.scss';

export const AppointmentList = ({ entries, type }) => {
  const [shouldDisplayInactive, setShouldDisplayInactive] = useState(false);
  const [sortedEntries, setSortedEntries] = useState([]);
  const [nextAppointment, setNextAppointment] = useState();

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DDTHH:mm');
    let searchForNextAppointment = true;

    sortedEntries.forEach((entry, index) => {
      const entryDate = entry.type === 'appointment'
        ? entry.appointment
        : entry.date;

      if (searchForNextAppointment && entryDate > currentDate) {
        searchForNextAppointment = false;
        setNextAppointment(index);
      }
    })
  }, [ sortedEntries ]);

  useEffect(() => {
    const sorted = entries
      .slice()
      .sort((a, b) => {
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

    setSortedEntries(sorted);
  }, [ entries ]);

  const buildHeader = (entry, index) => {
    const previousEntry = entries[index - 1];
    const currentItemDateAndTime = entry.type === 'appointment' ? entry.appointment : entry.date;
    const previousEntryDateAndTime =
      previousEntry && (previousEntry.type === 'appointment' ? previousEntry.appointment : previousEntry.date);
    const currentItemDate = currentItemDateAndTime.slice(0, currentItemDateAndTime.indexOf('T'));
    const previousEntryDate =
      previousEntryDateAndTime && previousEntryDateAndTime.slice(0, previousEntryDateAndTime.indexOf('T'));
    const isFirstEntry = !previousEntry || !isActiveAppointment(previousEntry) && isActiveAppointment(entry);
    const shouldDisplayHeader = (currentItemDate !== previousEntryDate) && !isFirstEntry;

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

  const shouldDisplayEntry = (entry) => {
    return entry && (shouldDisplayInactive || isActiveAppointment(entry));
  };

  const toggleShouldDisplayInactive = () => {
    setShouldDisplayInactive(!shouldDisplayInactive);
  };

  return (
    <div className={`appointments-container-${type}`}>
      {
        type === 'secondary' && (
          <FormControlLabel
            checked={shouldDisplayInactive}
            className={`appointments-container-${type}__switch`}
            control={<Switch color='primary' />}
            label={labels.SHOW_INACTIVE_APPOINTMENTS}
            labelPlacement={isMobile() ? undefined : 'start'}
            onChange={toggleShouldDisplayInactive}
          />
        )
      }
      {sortedEntries?.map((entry, index) => {
        if (shouldDisplayEntry(entry)) {
          return type === 'primary' ? (
            <Fragment key={entry._id}>
              {buildHeader(entry, index)}
              <AppointmentPrimary entry={entry} />
            </Fragment>
          ) : (
            <AppointmentSecondary
              key={entry._id}
              isNext={index === nextAppointment}
              entry={entry}
            />
          );
        }
      })}
      { type === 'primary' && <AppointmentsPlaceholder /> }
    </div>
  );
};