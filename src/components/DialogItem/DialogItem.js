import { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, TextField } from '@material-ui/core/';

const DialogItem = ({ classes, field, onInputChange, onShowChilds }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [optionsIDs, setOptionsIDs] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    const options = field.options?.map((option) => option._id);
    const initialInputValue = field.options?.find((option) => option._id === field.value)?.label || '';

    setOptionsIDs(options);
    setInputValue(initialInputValue);

    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [field, isInitialized]);

  if (isInitialized && field.id !== '_id' && !field.isHidden) {
    switch (field.type) {
      case 'button':
        return (
          <Button
            color='primary'
            onMouseDown={() => {
              if (field.items.length) {
                onShowChilds(field, buttonState);
                setButtonState((state) => !state);
              }
            }}
            size='large'
            variant='contained'
          >
            {field.label}
          </Button>
        );
      case 'dropdown':
        return (
          <Autocomplete
            className={classes.input}
            disabled={field.isDisabled}
            getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label || ''}
            getOptionSelected={(option, value) => value === '' || value === option}
            inputValue={inputValue}
            key={field.id}
            noOptionsText={
              <Button
                color='primary'
                onMouseDown={() => {
                  if (field.items.length) {
                    onShowChilds(field, true);
                  }
                }}
                size='large'
                variant='contained'
              >
                Fără rezultate! Adăugați pacient
              </Button>
            }
            onChange={(ev, value) => onInputChange(field.id, value)}
            onInputChange={(event, value) => setInputValue(value)}
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
