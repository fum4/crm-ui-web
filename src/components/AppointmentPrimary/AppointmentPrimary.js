import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import { PermContactCalendar, WatchLater, Timelapse } from '@material-ui/icons';
import { labels } from '../../constants';
import './styles.scss';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Dialog } from '../index';
import { useEffect, useState } from 'react';

const AppointmentPrimary = ({ entry }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const { name, surname, appointment, control, date, price, treatment, technician } = entry;
  const isAppointment = entry.type === 'appointment';

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
            <Typography className='name__text' component='h2' variant='h7'>
              {
                `${surname} ${name}`
              }
            </Typography>
          </div>
          <div className='appointment'>
            {
              isAppointment ? <WatchLater className='appointment__icon' /> : <Timelapse className='appointment__icon' />
            }
            <Typography className='appointment__text' component='h2' variant='h6'>
              {
                isAppointment ? `${labels.APPOINTMENT} - ${appointment}` : `${labels.CONTROL} - ${date}`
              }
            </Typography>
          </div>
          {
            treatment && (
              <div className='info' component='p' variant='body2'>
                <Chip className='info__label' label={labels.TREATMENT} size='small' />
                <span className='info__text'>{ treatment }</span>
              </div>
            )
          }
          {
            isAppointment && control && (
              <div className='info' component='p' variant='body2'>
                <Chip className='info__label' label={labels.CONTROL} size='small' />
                <span className='info__text'>{ control }</span>
              </div>
            )
          }
          {
            technician && (
              <div className='info' component='p' variant='body2'>
                <Chip className='info__label' label={labels.TECHNICIAN} size='small' />
                <span className='info__text'>{ technician }</span>
              </div>
            )
          }
          {
            price && (
              <div className='info' component='p' variant='body2'>
                <Chip className='info__label' label={labels.PRICE} size='small' />
                <span className='info__text'>{ price }</span>
              </div>
            )
          }
        </CardContent>
        <div className='card-actions'>
          <FaPen
            className='card-actions__edit-icon'
            onClick={() => setShowEditModal(true)}
          />
          <FaTrashAlt
            className='card-actions__remove-icon'
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </Card>
      {
        showEditModal && (
          <Dialog
            action='edit'
            setShowModal={setShowEditModal}
            type={entry.type}
            values={formValues}
          />
        )
      }
      {
        showDeleteModal && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteModal}
            type={entry.type}
            values={{ _id: entry._id }}
          />
        )
      }
    </>
  );
};

export default AppointmentPrimary;
