import {Fragment, useState, useEffect} from 'react';
import {FaTrashAlt, FaPen} from 'react-icons/fa';
import {deleteAppointment} from '../../services/network';
import {Dialog} from '..';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './styles.scss';

const AppointmentSecondary = ({ entry, parentId, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    const clientValue = {
      id: 'client',
      key: 'value',
      value: parentId
    };

    const clientDisableState = {
      id: 'client',
      key: 'isDisabled',
      value: true
    };

    formValues.push(clientValue, clientDisableState);

    Object.keys(entry).forEach((key) => {
      formValues.push({
        id: key,
        key: 'value',
        value: entry[key]
      });
    });

    setFormValues(formValues);
  }, [formValues, entry, parentId]);

  const removeEntry = () => {
    deleteAppointment({clientId: parentId, date: entry.date}).then(() => onUpdate());
  };

  return (
    <Fragment>
      <ListItem>
        <ListItemText
          className='appointment-secondary appointment-secondary__appointment'
          primary={entry?.appointment}
        />
        <ListItemText className='appointment-secondary appointment-secondary__date' primary={entry?.date} />
        <ListItemText
          className='appointment-secondary appointment-secondary__treatment'
          primary={entry?.treatment}
        />
        <ListItemText
          className='appointment-secondary appointment-secondary__control'
          primary={entry?.control}
        />
        <ListItemText
          className='appointment-secondary appointment-secondary__technician'
          primary={entry?.technician}
        />
        <ListItemText className='appointment-secondary appointment-secondary__price' primary={entry?.price} />
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
      {showEditModal && (
        <Dialog
          action='edit'
          setShowModal={setShowEditModal}
          successHandler={() => onUpdate()}
          type='appointment'
          values={formValues}
        />
      )}
    </Fragment>
  );
};

export default AppointmentSecondary;