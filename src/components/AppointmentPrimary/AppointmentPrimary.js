import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import { PermContactCalendar, Schedule } from '@material-ui/icons';
import { labels } from '../../constants';
import './styles.scss';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Dialog } from '../index';
import { useEffect, useState } from 'react';
import { deleteAppointment } from '../../services/network';

const AppointmentPrimary = ({ entry, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const { name, surname } = entry;
  const { appointment, control, price, treatment, technician } = entry.appointment;

  useEffect(() => {
    formValues.push({
      id: 'client',
      key: 'value',
      value: entry._id
    });

    formValues.push({
      id: 'client',
      key: 'isDisabled',
      value: true
    });

    Object.keys(entry.appointment).forEach((key) => {
      formValues.push({
        id: key,
        key: 'value',
        value: entry.appointment[key]
      });
    });

    setFormValues(formValues);
  }, [formValues, entry]);

  const removeEntry = () => {
    deleteAppointment({ _id: entry.appointment._id }).then(() => onUpdate());
  };

  return (
    <>
      <Card className='appointment-primary' variant='outlined'>
        <CardContent className='card-content'>
          <div className='name'>
            <PermContactCalendar className='name__icon' fontSize='large' />
            <Typography className='name__text' component='h2' variant='h5'>
              {
                `${surname} ${name}`
              }
            </Typography>
          </div>
          <div className='appointment'>
            <Schedule className='appointment__icon' />
            <Typography className='appointment__text' component='h2' variant='h6'>
              {
                appointment
              }
            </Typography>
          </div>
          <Typography className='info' component='p' variant='body2'>
            <Chip className='info__label' label={labels.TREATMENT} size='small' />
            <span className='info__text'>{ treatment }</span>
          </Typography>
          <Typography className='info' component='p' variant='body2'>
            <Chip className='info__label' label={labels.CONTROL} size='small' />
            <span className='info__text'>{ control }</span>
          </Typography>
          <Typography className='info' component='p' variant='body2'>
            <Chip className='info__label' label={labels.TECHNICIAN} size='small' />
            <span className='info__text'>{ technician }</span>
          </Typography>
          <Typography className='info' component='p' variant='body2'>
            <Chip className='info__label' label={labels.PRICE} size='small' />
            <span className='info__text'>{ price }</span>
          </Typography>
        </CardContent>
        <div className='card-actions'>
          <FaPen
            className='card-actions__edit-icon'
            onClick={() => setShowEditModal(true)}
          />
          <FaTrashAlt
            className='card-actions__remove-icon'
            onClick={() => removeEntry()}
          />
        </div>
      </Card>
      {
        showEditModal && (
          <Dialog
            action='edit'
            setShowModal={setShowEditModal}
            successHandler={() => onUpdate()}
            type={'appointment'}
            values={formValues}
          />
        )
      }
    </>
  );
};

export default AppointmentPrimary;
