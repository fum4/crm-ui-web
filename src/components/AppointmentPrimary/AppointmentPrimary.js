import {useEffect, useState, useMemo} from 'react';
import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import { PermContactCalendar, WatchLater, Timelapse } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { labels } from '../../constants';
import { formatPhoneNumber, getHourFromDate, formatPrettyDate } from 'services/utils';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Dialog } from '../index';
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

const AppointmentPrimary = ({ entry }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState([]);

  const { hour, minutes } = useMemo(() =>
    getHourFromDate(entry.type === 'appointment' ? entry.appointment : entry.date)
  , [ entry ]);

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

    const excludeFields = ['name', 'surname', 'type', '__v', 'clientId', 'appointmentId'];

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
    <div className='appointments-container-primary__item'>
      <Card className='appointment-primary' variant='outlined'>
        <CardContent className='card-content'>
          <div className='name'>
            <PermContactCalendar className='name__icon' fontSize='large' />
            <MuiThemeProvider theme={theme}>
              <Typography className='name__text' component='h2' variant='h5'>
                {`${entry.surname} ${entry.name}`}
              </Typography>
            </MuiThemeProvider>
          </div>
          <div className='appointment'>
            {
              entry.type === 'appointment' ? (
                <WatchLater className='appointment__icon' />
              ) : (
                <Timelapse className='appointment__icon' />
              )
            }
            <Typography className='appointment__text' component='h2' variant='h6'>
              <span className='appointment__type'>{entry.type === 'appointment' ? labels.APPOINTMENT : labels.CONTROL}</span>
              <span>{hour}</span>
              <sup>{minutes}</sup>
            </Typography>
          </div>
          {
            entry.phone && (
              <div className='info'>
                <Chip
                  className='info__label'
                  label={labels.PHONE}
                  size='small'
                />
                <a className='info__text__phone' href={`tel:${entry.phone}`}>{formatPhoneNumber(entry.phone)}</a>
              </div>
            )
          }
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
                <span className='info__text'>{ formatPrettyDate(entry.control) }</span>
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
        </CardContent>
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

export default AppointmentPrimary;
