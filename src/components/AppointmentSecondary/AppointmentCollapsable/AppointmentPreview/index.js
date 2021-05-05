import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import {Timelapse, WatchLater} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { formatPrettyDate } from 'services/utils';
import './styles.scss';

const AppointmentPreview = ({ entry, isNext, setShowEditDialog, setShowDeleteDialog }) => {
  const date = entry.type === 'appointment'
    ? entry.appointment
    : entry.date;

  return (
    <div className='appointment-preview'>
      <div className='name-container'>
        {
          entry.type === 'appointment' ? (
            <WatchLater className={`name-container__icon ${isNext ? 'active' : ''}`} />
          ) : (
            <Timelapse className={`name-container__icon ${isNext ? 'active' : ''}`} />
          )
        }
        <Typography align='center'>{ formatPrettyDate(date) }</Typography>
      </div>
      <div className='action-buttons'>
        <Button
          className='edit-btn'
          color='primary'
          onClick={() => setShowEditDialog(true)}
          size='large'
          variant='outlined'
        >
          <FaPen className='edit-icon' size={13} />
        </Button>
        <Button
          className='remove-btn'
          color='secondary'
          onClick={() => setShowDeleteDialog(true)}
          size='large'
          variant='outlined'>
          <FaTrashAlt className='remove-icon' />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentPreview;
