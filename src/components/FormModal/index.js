import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Dialog } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 10
  },
  input: {
    margin: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const FormModal = ({ setShowModal, successHandler, title, fields, onSubmit }) => {
  const classes = useStyles();
  const [ details, setDetails ] = useState();

  const onInputChange = (key, value) => {
    const updatedDetails = details.map((item) => {
      if (item.id === key) {
        item.value = value;
      }

      return item;
    });

    setDetails(updatedDetails);
  }

  useEffect(() => {
    setDetails(fields);
  }, [fields])

  const hideModal = () => {
    setShowModal(false)
  }

  const handleSubmit = () => {
    const client = details.find((detail) => detail.id === 'client');

    client.value = client.value._id;

    onSubmit({ ...details }).then(() => {
      hideModal();
      successHandler();
    });
  }

  return (
    <Dialog fullWidth={true} maxWidth='md' open={true}>
      <div className='modal-header'>
        <h2>{title}</h2>
        <div className='close-btn-container'>
          <FaTimes
            onClick={() => hideModal()}
            className='close-btn'
            size={35} />
        </div>
      </div>
      <form className={ classes.root } noValidate autoComplete='off'>
        {
          details?.map((field, index) => {
            return field.isDropdown ? (
              <Autocomplete
                value={ details?.find((detail) => detail.id === field.id)?.value }
                onChange={ (event, value) => onInputChange(field.id, value) }
                defaultValue={ field.value || null }
                options={ field.options }
                getOptionLabel={ (item) => item.label }
                className={ classes.input }
                required={ field.isRequired }
                disabled={ field.isDisabled }
                renderInput={ (params) => <TextField {...params} label={field.label} variant='filled' /> }
              />
              ) : (
              <TextField
                key={ index }
                value={ details?.find((detail) => detail.id === field.id)?.value }
                onChange={ (event) => onInputChange(field.id,  event.target.value) }
                className={ classes.input }
                id={ field.id }
                label={ field.label }
                variant='filled'
                required={ field.isRequired } />
              )
          })
        }
        <div className='modal-footer'>
          <Button
            onClick={() => handleSubmit()}
            variant='contained'
            color='primary'
            size='large'>
            Adaugă
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default FormModal;
