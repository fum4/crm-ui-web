import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Dialog} from '@material-ui/core';
import {FaTimes} from 'react-icons/fa';
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

const FormModal = ({setShowModal, successHandler, title, fields, onSubmit}) => {
  const classes = useStyles();
  const [details, setDetails] = useState();

  const onInputChange = (key, value) => {
    const updatedDetails = details.map((item) => {
      if (item.id === key) {
        item.value = value;
      }

      return item;
    });

    setDetails(updatedDetails);
  };

  useEffect(() => {
    setDetails(fields);
  }, [fields]);

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    onSubmit({...details}).then(() => {
      hideModal();
      successHandler();
    });
  };

  return (
    <Dialog fullWidth={true} maxWidth='md' open={true}>
      <div className='modal-header'>
        <h2>{title}</h2>
        <div className='close-btn-container'>
          <FaTimes className='close-btn' onClick={() => hideModal()} size={35} />
        </div>
      </div>
      <form autoComplete='off' className={classes.root}>
        {details?.map((field) => {
          const value = details.find((detail) => detail.id === field.id).value;
          const options = field.options?.map((option) => option._id);
          const type = field.id === 'date' ? 'datetime-local' : '';

          return field.isDropdown && field.options.length ? (
            <Autocomplete
              className={classes.input}
              defaultValue={field.value}
              disabled={field.isDisabled}
              getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label}
              key={field.id}
              onChange={(ev, value) => onInputChange(field.id, value)}
              options={options}
              renderInput={(params) => <TextField {...params} label={field.label} variant='filled' />}
              required={field.isRequired}
              value={value}
            />
          ) : (
            <TextField
              className={classes.input}
              defaultValue={field.id === 'date' ? '2017-05-24T10:30' : ''}
              id={field.id}
              key={field.id}
              label={field.label}
              onChange={(event) => onInputChange(field.id, event.target.value)}
              required={field.isRequired}
              type={type}
              value={value}
              variant='filled'
            />
          );
        })}
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
