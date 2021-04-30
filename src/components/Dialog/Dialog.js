import { useState, useEffect } from 'react';
import { Form } from '..';
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
import { FaTimes } from 'react-icons/fa';
import { Button, Dialog as Modal } from '@material-ui/core';
import _ from 'lodash';
import './styles.scss';

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

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (payload) => {
    switch (action) {
      case 'add':
        switch (type) {
          case 'appointment':
            dispatch(insertAppointment(serializeForm(payload)));
            break;
          case 'client':
            dispatch(insertClient(serializeForm(payload)));
            break;
        }
        break;
      case 'edit':
        switch (type) {
          case 'appointment':
          case 'control':
            dispatch(editAppointment(serializeForm(payload)));
            break;
          case 'client':
            dispatch(editClient(serializeForm(payload)));
            break;
        }
        break;
      case 'delete':
        switch (type) {
          case 'appointment':
            dispatch(removeAppointment({ _id: values._id }));
            break;
          case 'client':
            dispatch(removeClient({ _id: values._id }));
            break;
          case 'control':
            dispatch(removeAppointment({ type: 'control', _id: values._id }));
            break;
        }
        break;
    }

    hideModal();
  };

  return isInitialized ? (
    <Modal className='modal' fullWidth maxWidth='md' open={true}>
      <div className='modal-header'>
        <div className='close-btn-container'>
          <FaTimes className='close-btn' onClick={() => hideModal()} size={35} />
        </div>
        <div className='title-container'>
          <h1>{title}</h1>
        </div>
      </div>
      {action === 'delete' ? (
        <div className='modal-footer delete-modal'>
          <Button color='primary' onClick={() => handleSubmit()} size='large' variant='contained'>
            {submitText}
          </Button>
        </div>
      ) : (
        <Form
          formFields={formFields}
          onSubmit={(payload) => handleSubmit(payload)}
          submitText={submitText}
          title={title}
        />
      )}
    </Modal>
  ) : (
    <div />
  );
};

export default Dialog;
