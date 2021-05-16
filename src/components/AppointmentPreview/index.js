import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Button, Typography } from '@material-ui/core';
import { Timelapse, WatchLater } from '@material-ui/icons';
import { formatPrettyDate } from 'utils/helpers';
import './styles.scss';

export const AppointmentPreview = ({ entry, isNext, setShowEditDialog, setShowDeleteDialog }) => {
  const date = entry.type === 'appointment'
    ? entry.appointment
    : entry.date;

    const handleShowEditDialog = (event) => {
      event.stopPropagation();
      setShowEditDialog(true);
    };

    const handleShowDeleteDialog = (event) => {
      event.stopPropagation();
      setShowDeleteDialog(true);
    };

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
          onClick={handleShowEditDialog}
          size='large'
          variant='outlined'
        >
          <FaPen className='edit-icon' size={13} />
        </Button>
        <Button
          className='remove-btn'
          color='secondary'
          onClick={handleShowDeleteDialog}
          size='large'
          variant='outlined'>
          <FaTrashAlt className='remove-icon' />
        </Button>
      </div>
    </div>
  );
};
