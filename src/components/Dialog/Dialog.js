import { useState, useEffect } from 'react';
import { FormModal } from '..';
import { labels, fieldsConfig, formTypes } from '../../constants';
import { getFormValues, serializeForm, getCurrentDate } from '../../services/utils';
import {
  addAppointment,
  updateAppointment,
  addClient,
  updateClient,
  getClients
} from '../../services/network';
import _ from 'lodash';

const Dialog = ({ successHandler, action, setShowModal, type, values }) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const getFormOptions = async () => {
      let options = [];
      let actionTitle;

      switch (type) {
        case 'appointment': {
          actionTitle = action === 'add' ? labels.ADD_APPOINTMENT : labels.EDIT_APPOINTMENT;
          
          const clients = await getClients();

          const clientsFieldOptions = clients.data?.map((client) => ({
            _id: client._id,
            label: `${client.surname} ${client.name}`
          }));

          if (clientsFieldOptions.length) {
            options.push({
              id: 'client',
              key: 'options',
              value: clientsFieldOptions,
            });
          }

          if (action === 'add') {
            options.push({
              id: 'date',
              key: 'value',
              value: getCurrentDate()
            });
          }

          break;
        }
        case 'client':
          actionTitle = action === 'add' ? labels.ADD_CLIENT : labels.EDIT_CLIENT;
      }

      if (values) {
        options = options.concat(values);
      }

      const fields = formTypes[type].map((item) => {
        let extraFields = [];

        if (fieldsConfig[item].items?.length) {
          extraFields = fieldsConfig[item].items.map((extraItem) => {
            return { ...fieldsConfig[extraItem], isHidden: true };
          });
        }

        return [fieldsConfig[item], ...extraFields];
      });

      const formValues = getFormValues(_.flatten(fields), _.flatten(options));

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

export default Dialog;
