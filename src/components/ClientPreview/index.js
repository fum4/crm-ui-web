import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { AddAlarm, PermContactCalendar } from '@material-ui/icons';
import { Dialog } from 'components';
import { labels } from 'utils/constants';
import { isMobile } from 'utils/helpers';
import './styles.scss';

export const ClientPreview = ({ entry }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState();

  useEffect(() => {
    const config = [
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

    setDialogConfig(config);
  }, [entry]);

  const handleShowAddDialog = (event) => {
    event.stopPropagation();
    setShowAddDialog(true);
  };

  const handleShowDeleteDialog = (event) => {
    event.stopPropagation();
    setShowDeleteDialog(true);
  };

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
          onClick={handleShowAddDialog}
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
          onClick={handleShowDeleteDialog}
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
            config={dialogConfig}
          />
        )
      }
      {
        showDeleteDialog && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteDialog}
            type='client'
            config={{ _id: entry._id }}
          />
        )
      }
    </div>
  );
};
