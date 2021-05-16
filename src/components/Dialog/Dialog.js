import { useState, useEffect } from 'react';
import { Form } from '..';
import { formTypes } from '../../constants';
import {
  getFormConfig,
  serializeForm,
  getCurrentDate,
  extractFields,
  getDialogTitle,
  getDialogSubmitButtonText,
  validators
} from 'services/utils';
import {
  insertClient,
  editClient,
  removeClient,
  useClients,
  insertAppointment,
  editAppointment,
  removeAppointment
} from '../../store';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { Button, Dialog as Modal } from '@material-ui/core';
import _ from 'lodash';
import './styles.scss';

const Dialog = ({ action, type, config, setShowModal }) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();
  const [isInitialized, setIsInitialized] = useState(false);
  const [submitText, setSubmitText] = useState(undefined);
  const clients = useClients();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeForm = async () => {
      if (action !== 'delete') {
        const currentDate = getCurrentDate();
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

            if (action === 'add') {
              options.push({
                id: 'appointment',
                key: 'validator',
                value: validators.isFutureDate
              });
            }

            options.push({
              id: 'appointment',
              key: 'value',
              value: currentDate
            });
            options.push({
              id: 'control',
              key: 'value',
              value: currentDate
            });

            const hasControl = config?.find((value) => value.id === 'control')?.value;

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
              value: currentDate
            });

            break;
          }
          case 'client':
            if (action === 'add') {
              options.push({
                id: 'appointment',
                key: 'value',
                value: currentDate
              });
              options.push({
                id: 'control',
                key: 'value',
                value: currentDate
              });
            }

            break;
        }

        if (config) {
          options = options.concat(config);
        }

        const fields = extractFields(formTypes[`${type}_${action}`]);

        setFormFields(getFormConfig(_.flatten(fields), _.flatten(options)));
      }

      setTitle(getDialogTitle(action, type));
      setSubmitText(getDialogSubmitButtonText(action, type));
    };

    initializeForm().then(() => setIsInitialized(true));
  }, [action, clients, type, config]);

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
            dispatch(editAppointment(serializeForm(payload)));
            break;
          case 'control':
            dispatch(editAppointment({ type: 'control', ...serializeForm(payload) }));
            break;
          case 'client':
            dispatch(editClient(serializeForm(payload)));
            break;
        }
        break;
      case 'delete':
        switch (type) {
          case 'appointment':
            dispatch(removeAppointment({ _id: config._id }));
            break;
          case 'control':
            dispatch(removeAppointment({ type: 'control', _id: config._id }));
            break;
          case 'client':
            dispatch(removeClient({ _id: config._id }));
            break;
        }
        break;
    }

    hideModal();
  };

  const hideModal = () => setShowModal(false);

  return isInitialized ? (
    <Modal className='modal' fullWidth maxWidth='md' open={true}>
      <div className='modal-header'>
        <div className='title'>
          <h1>{title}</h1>
        </div>
        <FaTimes
          className='close-btn'
          onClick={hideModal}
          size={35}
        />
      </div>
      {
        action === 'delete' ? (
          <div className='modal-footer delete-modal'>
            <Button
              color='secondary'
              onClick={handleSubmit}
              size='large'
              variant='contained'
            >
              { submitText }
            </Button>
          </div>
        ) : (
          <Form
            formFields={formFields}
            onSubmit={handleSubmit}
            submitText={submitText}
            title={title}
          />
        )
      }
    </Modal>
  ) : (
    <div />
  );
};

export default Dialog;
