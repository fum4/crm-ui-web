import { useState, useEffect } from 'react';
import { FormModal } from '..';
import { addAppointmentFields, labels, fields, fieldsConfig } from '../../constants';
import { getFormValues, serializeForm, getCurrentDate } from '../../services/utils';
import {
  addAppointment,
  updateAppointment,
  addClient,
  updateClient,
  getClients
} from '../../services/network';
import _ from 'lodash';

const AppointmentDialog = ({ successHandler, action, setShowModal, type, values }) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const getFormOptions = async () => {
      let options = [];

      switch (type) {
        case 'appointment': {
          const clients = await getClients();

          const clientsFieldOptions =
            clients.data &&
            clients.data.map((client) => ({
              _id: client._id,
              label: `${client.surname} ${client.name}`
            }));

          if (clientsFieldOptions.length) {
            options.push({
              id: 'client',
              key: 'options',
              value: clientsFieldOptions
            });
          }

          if (action === 'add') {
            options.push({
              id: 'date',
              key: 'value',
              value: getCurrentDate()
            });
          }
        }
      }

      if (values) {
        options = options.concat(values);
      }

      const formValues = getFormValues(addAppointmentFields, _.flatten(options));
      const actionTitle = action === 'add' ? labels.ADD_APPOINTMENT : labels.EDIT_APPOINTMENT;

      setFormFields(formValues);
      setTitle(actionTitle);
    };
    getFormOptions();
  }, [action, type, values]);

  const handleSubmit = (payload) => {
    switch (action) {
      case 'add':
        switch (type) {
          case 'appointment':
            return addAppointment(serializeForm(payload));
          case 'client':
            return addClient(serializeForm(payload));
          default:
            return undefined;
        }
      case 'edit':
        switch (type) {
          case 'appointment':
            return updateAppointment(serializeForm(payload));
          case 'client':
            return updateClient(serializeForm(payload));
          default:
            return undefined;
        }
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
