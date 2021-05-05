import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { AttachMoney, Build, LocalHospital, Timelapse, WatchLater } from '@material-ui/icons';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { formatPrettyDate, getHourFromDate } from 'services/utils';
import './styles.scss';

const AppointmentExpanded = ({ entry, setShowEditDialog, setShowDeleteDialog }) => {
  const hasControl = !!entry.control;
  const isAppointment = entry.type === 'appointment';
  const entryDate = isAppointment ? entry.appointment : entry.date;
  const { hour, minutes } = getHourFromDate(entryDate);
  const fullDate = `${formatPrettyDate(entryDate)} - ${hour}:${minutes}`;

    return (
    <ListItem>
      <div className='appointment-secondary__data'>
        {
          isAppointment ? (
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
          entry?.treatment && (
            <>
              <LocalHospital />
              <ListItemText
                className='appointment-secondary appointment-secondary__treatment'
                primary={entry?.treatment}
              />
            </>
          )
        }
        {
          entry?.technician && (
            <>
              <Build />
              <ListItemText
                className='appointment-secondary appointment-secondary__technician'
                primary={entry?.technician}
              />
            </>
          )
        }
        {
          entry?.price && (
            <>
              <AttachMoney />
              <ListItemText
                className='appointment-secondary appointment-secondary__price'
                primary={entry?.price}
              />
            </>
          )
        }
        {
          isAppointment && hasControl && (
            <>
              <Timelapse />
              <ListItemText
                className='appointment-secondary appointment-secondary__control'
                primary={formatPrettyDate(entry?.control)}
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

export default AppointmentExpanded;
