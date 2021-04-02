import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import { Dialog } from '..';
import { labels } from '../../constants';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const ClientPreview = ({ entry, onUpdate }) => {
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
      <Typography align='center'>{`${entry.surname} ${entry.name}`}</Typography>
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
