import { useState, useEffect } from 'react';
import { FormModal } from '..';
import { getFormValues, serializeForm, getCurrentDate } from '../../services/utils';
import { addClientFields, labels } from '../../constants';
import { addClient, updateClient } from '../../services/network';

const ClientDialog = ({ successHandler, action, setShowModal }) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const options = [
      {
        id: 'date',
        key: 'value',
        value: getCurrentDate()
      }
    ];
    const formValues = getFormValues(addClientFields, options);
    const actionTitle = action === 'add' ? labels.ADD_CLIENT : labels.EDIT_CLIENT;

    setFormFields(formValues);
    setTitle(actionTitle);
  }, [action]);

  const handleSubmit = (payload) => {
    switch (action) {
      case 'add':
        return addClient(serializeForm(payload));
      case 'edit':
        return updateClient(serializeForm(payload));
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

export default ClientDialog;
