import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import { Dialog } from '..';
import { labels } from '../../constants';
import { deleteClient } from '../../services/network';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const ClientPreview = ({ entry, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
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

  const removeEntry = () => {
    deleteClient({ _id: entry._id }).then(() => onUpdate());
  };

  return (
    <>
      <Typography>{`${entry.surname} ${entry.name}`}</Typography>
      <div className='pull-right'>
        <Button
          className='add-new-btn'
          color='primary'
          onClick={() => setShowModal(true)}
          size='small'
          variant='outlined'
        >
          <FaPlus className='add-icon' size={13} />
          <p>{labels.APPOINTMENT}</p>
        </Button>
        <Button
          className='remove-btn'
          color='secondary'
          onClick={() => removeEntry()}
          size='large'
          variant='outlined'>
          <FaTrashAlt className='remove-icon' />
        </Button>
      </div>
      {
        showModal && (
          <Dialog
            action='add'
            setShowModal={setShowModal}
            successHandler={() => onUpdate()}
            type={'appointment'}
            values={formValues}
          />
        )
      }
    </>
  );
};

export default ClientPreview;
