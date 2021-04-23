import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import { PermContactCalendar, WatchLater, Timelapse } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { labels } from '../../constants';
import { formatPhoneNumber, getHourFromDate } from '../../services/utils';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Dialog } from '../index';
import './styles.scss';

const AppointmentPrimary = ({ entry }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const { name, surname, appointment, control, date, price, treatment, technician, phone } = entry;
  const isAppointment = entry.type === 'appointment';
  const hourAndMinutes = getHourFromDate(isAppointment ? appointment : date);

  const THEME = createMuiTheme({
    typography: {
      // fontFamily: '"MyCustomFont"',
      // fontSize: 20,
      lineHeight: 1.5,
      letterSpacing: 0.32,
      useNextVariants: true,
      // suppressDeprecationWarnings: true,
      h5: {
        fontWeight: 750
      }
    }
  });

  useEffect(() => {
    formValues.push({
      id: 'client',
      key: 'value',
      value: entry.clientId
    });

    formValues.push({
      id: 'client',
      key: 'isDisabled',
      value: true
    });

    const excludeFields = ['name', 'surname', 'type', '__v', 'clientId', 'appointmentId'];

    Object.keys(entry).forEach((key) => {
      if (!excludeFields.includes(key)) {
        formValues.push({
          id: key,
          key: 'value',
          value: entry[key]
        });
      }
    });

    setFormValues(formValues);
  }, [formValues, entry]);

  return (
    <>
      <Card className='appointment-primary' variant='outlined'>
        <CardContent className='card-content'>
          <div className='name'>
            <PermContactCalendar className='name__icon' fontSize='large' />
            <MuiThemeProvider theme={THEME}>
              <Typography className='name__text' component='h2' variant='h5'>
                {`${surname} ${name}`}
              </Typography>
            </MuiThemeProvider>
          </div>
          <div className='appointment'>
            {isAppointment ? (
              <WatchLater className='appointment__icon' />
            ) : (
              <Timelapse className='appointment__icon' />
            )}
            <Typography className='appointment__text' component='h2' variant='h6'>
              <span className='appointment__type'>{isAppointment ? labels.APPOINTMENT : labels.CONTROL}</span>
              <span>{hourAndMinutes.hour}</span>
              <sup>{hourAndMinutes.minutes}</sup>
            </Typography>
          </div>
          {phone && (
            <div className='info' component='p' variant='body2'>
              <Chip
                className='info__label'
                // icon={<Phone />}
                label={labels.PHONE}
                size='small'
              />
              <span className='info__text__phone'>{formatPhoneNumber(phone)}</span>
            </div>
          )}
          {treatment && (
            <div className='info' component='p' variant='body2'>
              <Chip
                className='info__label'
                // icon={<LocalHospital />}
                label={labels.TREATMENT}
                size='small'
              />
              <span className='info__text'>{treatment}</span>
            </div>
          )}
          {isAppointment && control && (
            <div className='info' component='p' variant='body2'>
              <Chip
                className='info__label'
                // icon={<Timelapse />}
                label={labels.CONTROL}
                size='small'
              />
              <span className='info__text'>{control}</span>
            </div>
          )}
          {technician && (
            <div className='info' component='p' variant='body2'>
              <Chip
                className='info__label'
                // icon={<Build />}
                label={labels.TECHNICIAN}
                size='small'
              />
              <span className='info__text'>{technician}</span>
            </div>
          )}
          {price && (
            <div className='info' component='p' variant='body2'>
              <Chip
                className='info__label'
                // icon={<AttachMoney />}
                label={labels.PRICE}
                size='small'
              />
              <span className='info__text'>{price}</span>
            </div>
          )}
        </CardContent>
        <div className='card-actions'>
          <FaPen className='card-actions__edit-icon' onClick={() => setShowEditModal(true)} />
          <FaTrashAlt className='card-actions__remove-icon' onClick={() => setShowDeleteModal(true)} />
        </div>
      </Card>
      {showEditModal && (
        <Dialog action='edit' setShowModal={setShowEditModal} type={entry.type} values={formValues} />
      )}
      {showDeleteModal && (
        <Dialog
          action='delete'
          setShowModal={setShowDeleteModal}
          type={entry.type}
          values={{ _id: entry._id }}
        />
      )}
    </>
  );
};

export default AppointmentPrimary;
