import { useState, useEffect } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import {Timelapse, WatchLater} from '@material-ui/icons';
import { Dialog } from '../../../index';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const AppointmentPreview = ({ entry, onUpdate }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    const values = [
      {
        id: 'appointment',
        key: 'value',
        value: entry._id
      },
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

    const excludeFields = ['_id', 'type', '__v'];

    Object.keys(entry).forEach((key) => {
      if (!excludeFields.includes(key)) {
        values.push({
          id: key,
          key: 'value',
          value: entry[key]
        });
      }
    });

    setFormValues(values);
  }, [entry]);

  return (
    <>
      <div className='name-container'>
        {
          entry.type === 'appointment' ? (
            <WatchLater className='name-container__icon' />
          ) : (
            <Timelapse className='name-container__icon' />
          )
        }
        <Typography align='center'>{entry.appointment || entry.date}</Typography>
      </div>
      <div className='action-buttons'>
        <Button
          className='add-new-btn'
          color='primary'
          onClick={() => setShowAddModal(true)}
          size='large'
          variant='outlined'
        >
          <FaPen className='add-icon' size={13} />
        </Button>
        <Button
          className='remove-btn'
          color='secondary'
          onClick={() => setShowDeleteModal(true)}
          size='large'
          variant='outlined'>
          <FaTrashAlt className='remove-icon' />
        </Button>
      </div>
      {
        showAddModal && (
          <Dialog
            action='edit'
            setShowModal={setShowAddModal}
            successHandler={() => onUpdate()}
            type={'appointment'}
            values={formValues}
          />
        )
      }
      {
        showDeleteModal && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteModal}
            successHandler={() => onUpdate()}
            type='client'
            values={{ _id: entry._id }}
          />
        )
      }
    </>
  );
};

export default AppointmentPreview;