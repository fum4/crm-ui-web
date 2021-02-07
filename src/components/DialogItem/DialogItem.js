import {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function DialogItem({classes, field, onInputChange}) {
  const isDate = field.id === 'date';
  const today = new Date().toISOString().slice(0, -8);
  const type = isDate ? 'datetime-local' : '';
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const [optionsIDs, setOptionsIDs] = useState();

  const isDropdown = field.isDropdown && field.options.length;

  useEffect(() => {
    const options = field.options?.map((option) => option._id);
    setOptionsIDs(options);
    const valueInit = field.value ? field.value : isDate ? today : '';
    setValue(valueInit);

    if (isDropdown) {
      const inputValueInit = field.options?.find((option) => option._id === field.value)?.label || '';
      setInputValue(inputValueInit);
    }

    isDate && onInputChange('date', valueInit);
  }, [field]);

  return isDropdown ? (
    <Autocomplete
      className={classes.input}
      disabled={field.isDisabled}
      getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label || ''}
      getOptionSelected={(option, value) => {
        //nothing that is put in here will cause the warning to go away
        if (value === '') {
          return true;
        } else if (value === option) {
          return true;
        }
      }}
      inputValue={inputValue}
      key={field.id}
      onChange={(ev, value) => {
        setValue(value);
        onInputChange(field.id, value);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={optionsIDs}
      renderInput={(params) => <TextField {...params} label={field.label} variant='filled' />}
      required={field.isRequired}
      value={value}
    />
  ) : (
    <TextField
      className={classes.input}
      id={field.id}
      key={field.id}
      label={field.label}
      onChange={(event) => {
        setValue(event.target.value);
        onInputChange(field.id, event.target.value);
      }}
      required={field.isRequired}
      type={type}
      value={value}
      variant='filled'
    />
  );
}
