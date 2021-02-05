import {useState, useEffect} from 'react';
import {FormModal} from '..';
import {getFormValues, serializeForm} from '../../services/utils';
import {addClientFields, labels} from '../../constants';
import {addClient, updateClient} from '../../services/network';

const ClientDialog = ({successHandler, action, setShowModal}) => {
  const [formFields, setFormFields] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const formValues = getFormValues(addClientFields);
    const title = action === 'add' ? labels.ADD_CLIENT : labels.EDIT_CLIENT;

    setFormFields(formValues);
    setTitle(title);
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

  return (
    <FormModal
      fields={formFields}
      onSubmit={(payload) => handleSubmit(payload)}
      setShowModal={setShowModal}
      successHandler={successHandler}
      title={title}
    />
  );
};

export default ClientDialog;
