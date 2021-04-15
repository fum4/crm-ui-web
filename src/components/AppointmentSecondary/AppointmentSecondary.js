import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useState, useEffect } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { WatchLater, Build, AttachMoney, LocalHospital, Timelapse } from '@material-ui/icons';
import { Dialog } from '..';
import './styles.scss';

const AppointmentSecondary = ({ entry, parentId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const isAppointment = entry.type === 'appointment';
  const hasControl = !!entry.control;

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

  return (
    <>
      <ListItem>
        <div className='appointment-secondary__data'>
          {
            isAppointment ? (
              <>
                <WatchLater />
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
          {
            entry?.treatment && (
              <>
                <LocalHospital />
                <ListItemText
                  className='appointment-secondary appointment-secondary__treatment'
                  primary={entry?.treatment}
                  />
              </>
            )
          }
          {
            entry?.technician && (
              <>
                <Build />
                <ListItemText
                  className='appointment-secondary appointment-secondary__technician'
                  primary={entry?.technician}
                />
              </>
            )
          }
          {
            entry?.control && (
              <>
                <AttachMoney />
                <ListItemText
                  className='appointment-secondary appointment-secondary__price'
                  primary={entry?.price}
                />
              </>
            )
          }
          {
            isAppointment && hasControl && (
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
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </ListItem>
      {
        showEditModal && (
          <Dialog
            action='edit'
            setShowModal={setShowEditModal}
            type={entry.type}
            values={formValues}
          />
        )
      }
      {
        showDeleteModal && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteModal}
            type={entry.type}
            values={{ _id: entry._id }}
          />
        )
      }
    </>
  );
};

export default AppointmentSecondary;
