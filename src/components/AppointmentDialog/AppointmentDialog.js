import {useState, useEffect} from 'react';
import {FormModal} from '..';
import {getFormValues, serializeForm} from '../../services/utils';
import {addAppointmentFields, labels} from '../../constants';
import {addAppointment, updateAppointment, getClients} from '../../services/network';
import _ from 'lodash';

const AppointmentDialog = ({successHandler, action, setShowModal, values}) => {
  const [formFields, setFormFields] = useState();
  const [clients, setClients] = useState([]);
  const [title, setTitle] = useState();

  useEffect(() => {
    const clientsFieldOptions = clients.map((client) => ({
      _id: client._id,
      label: `${client.surname} ${client.name}`
    }));

    let options = [
      {
        id: 'client',
        key: 'options',
        value: clientsFieldOptions
      }
    ];

    if (action === 'edit') {
      options.push({
        id: 'date',
        key: 'index',
        value: values.find((field) => field.id === 'date').value })
    }

    if (action === 'add') {
      const today = new Date().toISOString().slice(0, -8);

      options.push({
        id: 'date',
        key: 'value',
        value: today
      })
    }

    if (values) {
      options = options.concat(values);
    }

    const formValues = getFormValues(addAppointmentFields, _.flatten(options));
    const title = action === 'add' ? labels.ADD_APPOINTMENT : labels.EDIT_APPOINTMENT;

    setFormFields(formValues);
    setTitle(title);
  }, [clients, action, values]);

  useEffect(() => {
    getClients().then((response) => {
      if (response.data.length) {
        setClients(response.data);
      }
    });
  }, []);

  const handleSubmit = (payload) => {
    switch (action) {
      case 'add':
        return addAppointment(serializeForm(payload));
      case 'edit':
        return updateAppointment(serializeForm(payload));
      default:
        return undefined;
    }
  };

  return (
    <FormModal
      formFields={formFields}
      onSubmit={(payload) => handleSubmit(payload)}
      setShowModal={setShowModal}
      successHandler={successHandler}
      title={title}
    />
  );
};

export default AppointmentDialog;
