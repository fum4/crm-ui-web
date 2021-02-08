import DialogItem from '../DialogItem';
import { useEffect, useState } from 'react';
import { Button, Dialog, makeStyles } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
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

const FormModal = ({setShowModal, successHandler, title, formFields, onSubmit}) => {
  const classes = useStyles();
  const [fields, setFields] = useState();

  const onInputChange = (key, value) => {
    const updatedDetails = fields.map((item) => {
      if (item.id === key) {
        item.value = value;
      }

      return item;
    });

    setFields(updatedDetails);
  };

  useEffect(() => {
    setFields(formFields);
  }, [formFields]);

  const hideModal = () => {
    setShowModal(false);
  };

  const extractIndexes = () => {
    fields.forEach((field) => {
      if (field.index) {
        fields.push({id: `${field.id}Index`, value: field.index});
      }
    });

    setFields(fields);
  };

  const handleSubmit = () => {
    extractIndexes();

    onSubmit({...fields}).then(() => {
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
            onInputChange={onInputChange} />
        ))}
        <div className='modal-footer'>
          <Button color='primary' onClick={() => handleSubmit()} size='large' variant='contained'>
            Adaugă
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default FormModal;
