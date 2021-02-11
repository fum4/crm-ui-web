import DialogItem from '../DialogItem';
import { useState } from 'react';
import { Button, Dialog, makeStyles } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { getFormValues } from '../../services/utils';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15)
  },
  input: {
    margin: 10
  },
  root: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    width: '60%'
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15)
  }
}));

const FormModal = ({ setShowModal, successHandler, title, formFields, onSubmit }) => {
  const classes = useStyles();
  const [fields, setFields] = useState(formFields);

  const onShowChilds = (field) => {
    const options = field.items?.map((item) => ({
      id: item,
      key: 'isHidden',
      value: false
    }));

    options.push({
      id: field.id,
      key: 'label',
      value: field.labelValues[1]
    });

    field.type === 'dropdown' &&
      options.push({
        id: field.id,
        key: 'value',
        value: ''
      });
      
    const formValues = getFormValues(fields, options);

    setFields(formValues);
  };

  const onInputChange = (key, value) => {
    const options = [];

    const updatedDetails = fields.map((field) => {
      if (field.id === key) {
        field.value = value;
      }

      if (field.type === 'dropdown') {
        field.items?.forEach((item) => {
          options.push({
            id: item,
            key: 'isHidden',
            value: true
          });
        });

        options.push({
          id: field.id,
          key: 'label',
          value: field.labelValues[0]
        });
      }

      return field;
    });

    const formValues = getFormValues(updatedDetails, options);

    setFields(formValues);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    onSubmit({ ...fields }).then(() => {
      hideModal();
      successHandler();
    });
  };

  return (
    <Dialog fullWidth maxWidth='md' open={true}>
      <div className='modal-header'>
        <h2>{title}</h2>
        <div className='close-btn-container'>
          <FaTimes className='close-btn' onClick={() => hideModal()} size={35} />
        </div>
      </div>
      <form autoComplete='off' className={classes.root}>
        {fields?.map((field) => (
          <DialogItem
            classes={classes}
            field={field}
            key={field.id}
            onInputChange={onInputChange}
            onShowChilds={onShowChilds}
          />
        ))}
        <div className='modal-footer'>
          <Button color='primary' onClick={() => handleSubmit()} size='large' variant='contained'>
            Adaugă
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default FormModal;
