import { useState, useEffect } from 'react';
import { FormModal } from '..';
import { addAppointmentFields, labels } from '../../constants';
import { getFormValues, serializeForm, getCurrentDate } from '../../services/utils';
import { addAppointment, updateAppointment, getClients } from '../../services/network';
import _ from 'lodash';

const AppointmentDialog = ({ successHandler, action, setShowModal, values }) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    getClients().then((clients) => {
      if (clients.data.length) {
        const clientsFieldOptions = clients.data.map((client) => ({
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

        if (action === 'add') {
          options.push({
            id: 'date',
            key: 'value',
            value: getCurrentDate()
          });
        }

        options.push({
          id: 'name',
          key: 'isHidden',
          value: false
        });

        if (values) {
          options = options.concat(values);
        }

        const formValues = getFormValues(addAppointmentFields, _.flatten(options));
        const actionTitle = action === 'add' ? labels.ADD_APPOINTMENT : labels.EDIT_APPOINTMENT;

        setFormFields(formValues);
        setTitle(actionTitle);
      }
    });
  }, [action, values]);

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

  return formFields ? (
    <FormModal
      formFields={formFields}
      onSubmit={(payload) => handleSubmit(payload)}
      setShowModal={setShowModal}
      successHandler={successHandler}
      title={title}
    />
  ) : (
    <div />
  );
};

export default AppointmentDialog;
