import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import { PermContactCalendar, PhoneIphone } from '@material-ui/icons';
import { Dialog } from '..';
import { labels } from '../../constants';
import { formatPhoneNumber } from '../../services/utils';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const ClientPreview = ({ entry, onUpdate, isExpanded }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    const values = [
      {
        id: 'client',
        key: 'value',
        value: entry._id
      },
      {
        id: 'client',
        key: 'isDisabled',
        value: true
      }
    ];

    setFormValues(values);
  }, [entry]);

  return (
    <>
      <div className='name-container'>
        <PermContactCalendar className='name-container__icon' />
        <Typography align='center'>{`${entry.surname} ${entry.name}`}</Typography>
        {
          isExpanded && (
            <div className='name-container__phone'>
              <PhoneIphone className='name-container__phone__icon' />
              <Typography align='center'>
                { formatPhoneNumber(entry.phone) }
              </Typography>
            </div>
          )
        }
      </div>
      <div className='pull-right'>
        <Button
          className='add-new-btn'
          color='primary'
          onClick={() => setShowAddModal(true)}
          size='small'
          variant='outlined'
        >
          <FaPlus className='add-icon' size={13} />
          <p>{labels.APPOINTMENT}</p>
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
            action='add'
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

export default ClientPreview;
