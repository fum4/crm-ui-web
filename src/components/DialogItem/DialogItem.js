import { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const DialogItem = ({ classes, field, onInputChange }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [optionsIDs, setOptionsIDs] = useState([]);

  useEffect(() => {
    const options = field.options?.map((option) => option._id);
    const initialInputValue = field.options?.find((option) => option._id === field.value)?.label || '';

    setOptionsIDs(options);
    setInputValue(initialInputValue);

    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [field, isInitialized]);

  return isInitialized ? (
    field.isDropdown ? (
      <Autocomplete
        className={classes.input}
        disabled={field.isDisabled}
        getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label || ''}
        getOptionSelected={(option, value) => value === '' || value === option}
        inputValue={inputValue}
        key={field.id}
        onChange={(ev, value) => onInputChange(field.id, value)}
        onInputChange={(event, value) => setInputValue(value)}
        options={optionsIDs}
        renderInput={(params) => <TextField {...params} label={field.label} variant='filled' />}
        required={field.isRequired}
        value={field.value || ''}
      />
    ) : (
      <TextField
        className={classes.input}
        id={field.id}
        key={field.id}
        label={field.label}
        onChange={(ev) => onInputChange(field.id, ev.target.value)}
        required={field.isRequired}
        type={field.id === 'date' ? 'datetime-local' : ''}
        value={field.value || ''}
        variant='filled'
      />
    )
  ) : (
    <div />
  );
}

export default DialogItem;
