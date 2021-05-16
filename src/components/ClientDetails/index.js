import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Button, Paper } from '@material-ui/core';
import { Phone, Comment, Home } from '@material-ui/icons';
import { formatPhoneNumber } from 'utils/helpers';
import { Dialog } from 'components';
import './styles.scss';

export const ClientDetails = ({ entry }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const dialogConfig = [
    {
      id: '_id',
      key: 'value',
      value: entry._id
    },
    {
      id: 'name',
      key: 'value',
      value: entry.name
    },
    {
      id: 'surname',
      key: 'value',
      value: entry.surname
    },
    {
      id: 'address',
      key: 'value',
      value: entry.address
    },
    {
      id: 'phone',
      key: 'value',
      value: entry.phone
    },
    {
      id: 'comments',
      key: 'value',
      value: entry.comments
    }
  ];

  return (
    <>
      <Paper className='client-details-container' variant='outlined'>
        <div className='client-details'>
          {
            entry.phone && (
              <div className='phone-container'>
                <Phone className='phone-icon' />
                <a className='phone-number' href={`tel:${entry.phone}`}>{formatPhoneNumber(entry.phone)}</a>
              </div>
            )
          }
          {
            entry.address && (
              <div className='address-container'>
                <Home className='address-icon' />
                <span className='address'>{entry.address}</span>
              </div>
            )
          }
          {
            entry.comments && (
              <div className='comments-container'>
                <Comment className='comments-icon' />
                <span className='comments-text'>{ entry.comments }</span>
              </div>
            )
          }
        </div>
        <div className='action-buttons'>
          <Button
            className='edit-btn'
            color='primary'
            onClick={() => setShowEditDialog(true)}
            size='large'
            variant='outlined'
          >
            <FaPen className='edit-icon' size={13} />
          </Button>
        </div>
      </Paper>
      {
        showEditDialog && (
          <Dialog
            action='edit'
            setShowModal={setShowEditDialog}
            type='client'
            config={dialogConfig}
          />
        )
      }
    </>
  );
};
