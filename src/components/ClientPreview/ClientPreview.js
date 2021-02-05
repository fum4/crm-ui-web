import {Fragment, useState, useEffect} from 'react';
import {FaPlus} from 'react-icons/fa';
import {Button} from '@material-ui/core';
import {Dialog} from '..';
import {labels} from '../../constants';
import Typography from '@material-ui/core/Typography';

const ClientPreview = ({ entry, onAddAppointment }) => {
  const [showModal, setShowModal] = useState(false);
  const formValues = [
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

  return (
    <Fragment>
      <Typography>{`${entry.surname} ${entry.name}`}</Typography>
      <Button
        className='add-new-btn pull-right'
        color='primary'
        onClick={() => setShowModal(true)}
        size='small'
        variant='outlined'>
        <FaPlus className='add-icon' size={13} />
        <p>{labels.APPOINTMENT}</p>
      </Button>
      {showModal && (
        <Dialog
          action='add'
          setShowModal={setShowModal}
          successHandler={() => onAddAppointment()}
          type='appointment'
          values={formValues}
        />
      )}
    </Fragment>
  );
};

export default ClientPreview;
