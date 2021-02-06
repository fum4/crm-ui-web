import {useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function DialogItem({classes, field, onInputChange}) {
  const isDate = field.id === 'date';
  const options = field.options?.map((option) => option._id);
  const today = new Date().toISOString().slice(0, -8);
  const textFieldDefaultValue = isDate ? today : '';
  const type = isDate ? 'datetime-local' : '';
  const valueInit = isDate ? textFieldDefaultValue : field.value && field.value;
  const [value, setValue] = useState(valueInit);

  return field.isDropdown && field.options.length ? (
    <Autocomplete
      className={classes.input}
      disabled={field.isDisabled}
      getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label}
      key={field.id}
      onChange={(ev, value) => {
        setValue(value);
        onInputChange(field.id, value);
      }}
      options={options}
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
