import {useEffect, useState} from 'react';
import {Button, Paper} from '@material-ui/core';
import {Phone, Comment, Home} from '@material-ui/icons';
import { formatPhoneNumber } from 'services/utils';
import './styles.scss';
import {Dialog} from "../../../";
import {FaPen} from "react-icons/fa";

const ClientDetails = ({ entry }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { phone, comments, address } = entry;
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    const values = [
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

    setFormValues(values);
  }, [entry]);

  return (
    <>
      <Paper className='client-details-container' variant='outlined'>
        <div className='client-details'>
          {
            phone && (
              <div className='phone-container'>
                <Phone className='phone-icon' />
                <a className='phone-number' href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
              </div>
            )
          }
          {
            address && (
              <div className='address-container'>
                <Home className='address-icon' />
                <span className='address'>{address}</span>
              </div>
            )
          }
          {
            comments && (
              <div className='comments-container'>
                <Comment className='comments-icon' />
                <span className='comments-text'>{ comments }</span>
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
            values={formValues}
          />
        )
      }
    </>
  );
};

export default ClientDetails;
