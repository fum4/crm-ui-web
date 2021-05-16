import { useMemo } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { ListItem, ListItemText } from '@material-ui/core';
import { AttachMoney, Build, LocalHospital, Timelapse, WatchLater } from '@material-ui/icons';
import { formatPrettyDate, getHourFromDate } from 'utils/helpers';
import './styles.scss';

export const AppointmentExpanded = ({ entry, setShowEditDialog, setShowDeleteDialog }) => {
  const fullDate = useMemo(() => {
    const date = entry.type === 'appointment' ? entry.appointment : entry.date;
    const { hour, minutes } = getHourFromDate(date);

    return `${formatPrettyDate(date)} - ${hour}:${minutes}`;
  }, [ entry ]);

  return (
    <ListItem>
      <div className='appointment-secondary__data'>
        {
          entry.type === 'appointment' ? (
            <>
              <WatchLater />
              <ListItemText
                className='appointment-secondary appointment-secondary__appointment'
                primary={fullDate}
              />
            </>
            ) : (
            <>
              <Timelapse />
              <ListItemText
                className='appointment-secondary appointment-secondary__control'
                primary={fullDate}
              />
            </>
          )
        }
        {
          entry.treatment && (
            <>
              <LocalHospital />
              <ListItemText
                className='appointment-secondary appointment-secondary__treatment'
                primary={entry.treatment}
              />
            </>
          )
        }
        {
          entry.technician && (
            <>
              <Build />
              <ListItemText
                className='appointment-secondary appointment-secondary__technician'
                primary={entry.technician}
              />
            </>
          )
        }
        {
          entry.price && (
            <>
              <AttachMoney />
              <ListItemText
                className='appointment-secondary appointment-secondary__price'
                primary={entry.price}
              />
            </>
          )
        }
        {
          entry.type === 'appointment' && entry.control && (
            <>
              <Timelapse />
              <ListItemText
                className='appointment-secondary appointment-secondary__control'
                primary={formatPrettyDate(entry.control)}
              />
            </>
          )
        }
      </div>
      <div className='appointment-secondary appointment-secondary__action-buttons'>
        <FaPen
          className='appointment-secondary appointment-secondary__edit-icon'
          onClick={() => setShowEditDialog(true)}
        />
        <FaTrashAlt
          className='appointment-secondary appointment-secondary__remove-icon'
          onClick={() => setShowDeleteDialog(true)}
        />
      </div>
    </ListItem>
  );
};
