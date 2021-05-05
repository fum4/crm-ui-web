import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import {AddAlarm, PermContactCalendar} from '@material-ui/icons';
import { Dialog } from '../../../index';
import { labels } from '../../../../constants';
import { isMobile } from '../../../../services/utils';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const ClientPreview = ({ entry }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
    <div className='client-preview'>
      <div className='name-container'>
        <PermContactCalendar className='name-container__icon' />
        <Typography align='left'>{`${entry.surname} ${entry.name}`}</Typography>
      </div>
      <div className='action-buttons'>
        <Button
          className='add-new-btn'
          color='primary'
          onClick={() => setShowAddDialog(true)}
          size='small'
          variant='outlined'
        >
          {
            isMobile() ? (
              <AddAlarm className='add-icon' />
            ) : (
              <>
                <FaPlus className='add-icon' size={13} />
                <p>{labels.APPOINTMENT}</p>
              </>
            )
          }
        </Button>
        <Button
          className='remove-btn'
          color='secondary'
          onClick={() => setShowDeleteDialog(true)}
          size='large'
          variant='outlined'>
          <FaTrashAlt className='remove-icon' />
        </Button>
      </div>
      {
        showAddDialog && (
          <Dialog
            action='add'
            setShowModal={setShowAddDialog}
            type={'appointment'}
            values={formValues}
          />
        )
      }
      {
        showDeleteDialog && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteDialog}
            type='client'
            values={{ _id: entry._id }}
          />
        )
      }
    </div>
  );
};

export default ClientPreview;
