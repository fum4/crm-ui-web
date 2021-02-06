import {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

export default function DialogItem({classes, field, onInputChange}) {
  const isDate = field.id === 'date';
  const today = new Date().toISOString().slice(0, -8);
  const textFieldDefaultValue = isDate ? today : '';
  const type = isDate ? 'datetime-local' : '';
  const [init, setInit] = useState(false);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState();
  const [optionsIDs, setOptionsIDs] = useState();

  const isDropdown = field.isDropdown && field.options.length;

  useEffect(() => {
    isDropdown && field.options.push({_id: '00', label: 'Alegeti pacient'});

    const options = field.options?.map((option) => option._id);

    setOptionsIDs(options);
    const valueInit = isDate
      ? textFieldDefaultValue
      : field.isDropdown
      ? field.value
        ? field.value
        : '00'
      : '';
    const inputValueInit = isDropdown
      ? field.options?.find((option) => option._id === field.value)?.label
      : 'Alegeti pacient';
    setValue(valueInit);
    !init && setInputValue(inputValueInit);
    !init && setInit(true);
  }, [field]);
  return init ? (
    isDropdown ? (
      <Autocomplete
        className={classes.input}
        disabled={field.isDisabled}
        getOptionLabel={(item) =>
          item === '00' ? 'Alegeti pacient' : field.options?.find((option) => option._id === item)?.label
        }
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
    )
  ) : (
    <div></div>
  );
}
