import { useState, useEffect } from 'react';
import { FormModal } from '..';
import { formTypes } from '../../constants';
import {
  getFormValues,
  serializeForm,
  getCurrentDate,
  extractFields,
  getDialogTitle,
  getDialogSubmitButtonText
} from '../../services/utils';
import {
  insertClient,
  editClient,
  removeClient,
  useAllClients,
  insertAppointment,
  editAppointment,
  removeAppointment
} from '../../store';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

const Dialog = ({ action, setShowModal, type, values }) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();
  const [isInitialized, setIsInitialized] = useState(false);
  const [submitText, setSubmitText] = useState(undefined);
  const clients = useAllClients();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeForm = async () => {
      if (action !== 'delete') {
        let options = [];

        switch (type) {
          case 'appointment': {
            const clientsFieldOptions = clients?.map((client) => ({
              _id: client._id,
              label: `${client.surname} ${client.name}`
            }));

            if (clientsFieldOptions?.length) {
              options.push({
                id: 'client',
                key: 'options',
                value: clientsFieldOptions
              });
            }

            options.push({
              id: 'appointment',
              key: 'value',
              value: getCurrentDate()
            });
            options.push({
              id: 'control',
              key: 'value',
              value: getCurrentDate()
            });

            const hasControl = values?.find((value) => value.id === 'control')?.value;

            if (hasControl) {
              options.push({
                id: 'control',
                key: 'isHidden',
                value: false
              });
              options.push({
                id: 'addControl',
                key: 'isHidden',
                value: true
              });
            }

            break;
          }
          case 'control': {
            const clientsFieldOptions = clients?.map((client) => ({
              _id: client._id,
              label: `${client.surname} ${client.name}`
            }));

            if (clientsFieldOptions?.length) {
              options.push({
                id: 'client',
                key: 'options',
                value: clientsFieldOptions
              });
            }

            options.push({
              id: 'appointment',
              key: 'isDisabled',
              value: true
            });
            options.push({
              id: 'control',
              key: 'value',
              value: getCurrentDate()
            });

            break;
          }
          case 'client':
            if (action === 'add') {
              options.push({
                id: 'appointment',
                key: 'value',
                value: getCurrentDate()
              });
              options.push({
                id: 'control',
                key: 'value',
                value: getCurrentDate()
              });
            }

            break;
        }

        if (values) {
          options = options.concat(values);
        }

        const fields = extractFields(formTypes[type]);
        const formValues = getFormValues(_.flatten(fields), _.flatten(options));

        setFormFields(formValues);
      }

      const dialogTitle = getDialogTitle(action, type);
      const dialogSubmitButtonText = getDialogSubmitButtonText(action, type);

      setTitle(dialogTitle);
      setSubmitText(dialogSubmitButtonText);
    };

    initializeForm().then(() => setIsInitialized(true));
  }, [action, clients, type, values]);

  const handleSubmit = (payload) => {
    switch (action) {
      case 'add':
        switch (type) {
          case 'appointment':
            return dispatch(insertAppointment(serializeForm(payload)));
          case 'client':
            return dispatch(insertClient(serializeForm(payload)));
          default:
            return undefined;
        }
      case 'edit':
        switch (type) {
          case 'appointment':
          case 'control':
            return dispatch(editAppointment(serializeForm(payload)));
          case 'client':
            return dispatch(editClient(serializeForm(payload)));
          default:
            return undefined;
        }
      case 'delete':
        switch (type) {
          case 'appointment':
            return dispatch(removeAppointment({ _id: values._id }));
          case 'client':
            return dispatch(removeClient({ _id: values._id }));
          case 'control':
            return dispatch(removeAppointment({ type: 'control', _id: values._id }));
          default:
            return undefined;
        }
      default:
        return undefined;
    }
  };

  return isInitialized ? (
    <FormModal
      buttonColor={action === 'delete' ? 'secondary' : 'primary'}
      formFields={formFields}
      onSubmit={(payload) => handleSubmit(payload)}
      setShowModal={setShowModal}
      submitText={submitText}
      title={title}
    />
  ) : (
    <div />
  );
};

export default Dialog;
