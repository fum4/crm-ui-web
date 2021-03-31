import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useState, useEffect } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { Schedule, Build, AttachMoney, LocalHospital, Timelapse } from '@material-ui/icons';
import { deleteAppointment, deleteControl } from '../../services/network';
import { Dialog } from '..';
import './styles.scss';

const AppointmentSecondary = ({ entry, parentId, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    formValues.push({
      id: 'client',
      key: 'value',
      value: parentId
    });

    formValues.push({
      id: 'client',
      key: 'isDisabled',
      value: true
    });

    const excludeFields = ['appointmentId', 'clientId', 'type', '__v'];

    Object.keys(entry).forEach((key) => {
      if (!excludeFields.includes(key)) {
        formValues.push({
          id: key,
          key: 'value',
          value: entry[key]
        });
      }
    });

    setFormValues(formValues);
  }, [formValues, entry, parentId]);

  const removeEntry = () => {
    entry.type === 'appointment'
      ? deleteAppointment({ _id: entry._id }).then(() => onUpdate())
      : deleteControl({ _id: entry._id }).then(() => onUpdate());
  };

  return (
    <>
      <ListItem>
        <div className='appointment-secondary__data'>
          {
            entry.type === 'appointment' ? (
              <>
                <Schedule />
                <ListItemText
                  className='appointment-secondary appointment-secondary__appointment'
                  primary={entry?.appointment}
                />
              </>
            ) : (
              <>
                <Timelapse />
                <ListItemText
                  className='appointment-secondary appointment-secondary__control'
                  primary={entry?.date}
                />
              </>
            )
          }
          <LocalHospital />
          <ListItemText
            className='appointment-secondary appointment-secondary__treatment'
            primary={entry?.treatment}
          />
          <Build />
          <ListItemText
            className='appointment-secondary appointment-secondary__technician'
            primary={entry?.technician}
          />
          <AttachMoney />
          <ListItemText className='appointment-secondary appointment-secondary__price' primary={entry?.price} />
          {
            entry.type === 'appointment' && (
              <>
                <Timelapse />
                <ListItemText
                  className='appointment-secondary appointment-secondary__control'
                  primary={entry?.control}
                />
              </>
            )
          }
        </div>
        <div className='appointment-secondary appointment-secondary__action-buttons'>
          <FaPen
            className='appointment-secondary appointment-secondary__edit-icon'
            onClick={() => setShowEditModal(true)}
          />
          <FaTrashAlt
            className='appointment-secondary appointment-secondary__remove-icon'
            onClick={() => removeEntry()}
          />
        </div>
      </ListItem>
      {
        showEditModal && (
          <Dialog
            action='edit'
            setShowModal={setShowEditModal}
            successHandler={() => onUpdate()}
            type={entry.type}
            values={formValues}
          />
        )
      }
    </>
  );
};

export default AppointmentSecondary;
