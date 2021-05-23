import { useEffect, useState, useMemo } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import { PermContactCalendar, WatchLater, Timelapse } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { labels } from 'utils/constants';
import { formatPhoneNumber, getHourFromDate, formatPrettyDate, isActiveAppointment } from 'utils/helpers';
import { Dialog } from 'components';
import './styles.scss';

const theme = createMuiTheme({
  typography: {
    lineHeight: 1.5,
    letterSpacing: 0.32,
    useNextVariants: true,
    h5: {
      fontWeight: 750
    }
  }
});

export const AppointmentCalendarItem = ({ entry }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState([]);

  useEffect(() => {
    const config = [
      {
        id: 'client',
        key: 'value',
        value: entry.clientId
      },
      {
        id: 'client',
        key: 'isDisabled',
        value: true
      }
    ];

    const excludeFields = ['name', 'surname', 'type', 'clientId', 'appointmentId'];

    Object.keys(entry).forEach((key) => {
      if (!excludeFields.includes(key)) {
        config.push({
          id: key,
          key: 'value',
          value: entry[key]
        });
      }
    });

    setDialogConfig(config);
  }, [entry]);

  return (
    <div className='appointments-container-calendar-item'>
      <Card variant='outlined'>
        <CardContent className='card-content' />
        <div className='card-actions'>
          <FaPen className='card-actions__edit-icon' onClick={() => setShowEditDialog(true)} />
          <FaTrashAlt className='card-actions__remove-icon' onClick={() => setShowDeleteDialog(true)} />
        </div>
      </Card>
      {
        showEditDialog && (
          <Dialog action='edit' setShowModal={setShowEditDialog} type={entry.type} config={dialogConfig} />
        )
      }
      {
        showDeleteDialog && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteDialog}
            type={entry.type}
            config={{ _id: entry._id }}
          />
        )
      }
    </div>
  );
};
