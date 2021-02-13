import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core/';

const FormItem = ({ classes, field, onInputChange, onFieldsExtend }) => {
  const [currentValue, setCurrentValue] = useState(false);
  const [optionsIDs, setOptionsIDs] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const options = field.options?.map((option) => option._id);
    setOptionsIDs(options);

    if (field.type === 'dropdown') {
      const initialValue = field.options?.find((option) => option._id === field.value)?.label || '';
      setCurrentValue(initialValue);
    }

    if (field.validator) {
      if (field.shouldValidate) {
        setIsValid(field.validator(field.value));
      }
    }
  }, [field]);

  if (field.id !== '_id' && !field.isHidden) {
    switch (field.type) {
      case 'button': {
        const Icon = field.icon;

        return (
          <Button
            color={field.color}
            onClick={() => {
              if (field.items.length) {
                onFieldsExtend(field, currentValue);
                setCurrentValue(!currentValue);
              }
            }}
            size='large'
            variant='outlined'
          >
            <Icon className='button-icon' />
            { field.label }
          </Button>
        );
      }
      case 'dropdown':
        return (
          <Autocomplete
            className={classes.input}
            disabled={field.isDisabled}
            getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label || ''}
            getOptionSelected={(option, value) => value === '' || value === option}
            inputValue={currentValue}
            key={field.id}
            noOptionsText={
              field.items.length && (
                <Button
                  color='primary'
                  onMouseDown={() => {
                    onFieldsExtend(field, false, currentValue);
                  }}
                  size='large'
                  variant='contained'
                >
                  Fără rezultate! Adăugați pacient
                </Button>
              )
            }
            onChange={(ev, value) => onInputChange(field.id, value)}
            onInputChange={(event, value) => setCurrentValue(value)}
            options={optionsIDs}
            renderInput={(params) => <TextField {...params} label={field.label} variant='filled' />}
            required={field.isRequired}
            value={field.value || ''}
          />
        );
      default:
        return (
          <TextField
            className={classes.input}
            error={field.shouldValidate && !isValid}
            id={field.id}
            key={field.id}
            label={field.label}
            onChange={(ev) => onInputChange(field.id, ev.target.value)}
            required={field.isRequired}
            type={field.type}
            value={field.value || ''}
            variant='filled'
          />
        );
    }
  } else {
    return <div />;
  }
};

export default FormItem;
