import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core/';

const DialogItem = ({ classes, field, onInputChange, onFieldsExtend }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentValue, setCurrentValue] = useState(false);
  const [optionsIDs, setOptionsIDs] = useState([]);

  useEffect(() => {
    const options = field.options?.map((option) => option._id);
    setOptionsIDs(options);

    if (field.type === 'dropdown') {
      const initialValue = field.options?.find((option) => option._id === field.value)?.label || '';
      setCurrentValue(initialValue);
    }

    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [field, isInitialized]);

  if (isInitialized && field.id !== '_id' && !field.isHidden) {
    switch (field.type) {
      case 'button': {
        const Icon = field.icon;

        return (
          <Button
            color='primary'
            onClick={() => {
              if (field.items.length) {
                onFieldsExtend(field, currentValue);
                setCurrentValue(!currentValue);
              }
            }}
            size='large'
            variant='outlined'
          >
            <Icon />
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
                    onFieldsExtend(field, false);
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

export default DialogItem;
