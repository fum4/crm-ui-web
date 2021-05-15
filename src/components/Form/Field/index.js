import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const Field = ({ classes, field, onInputChange, onFieldsExtend }) => {
  const [currentValue, setCurrentValue] = useState(false);
  const [optionsIds, setOptionsIds] = useState([]);

  useEffect(() => {
    if (field.type === 'dropdown') {
      const options = field.options?.map((option) => option._id);
      const initialValue = field.options?.find((option) => option._id === field.value)?.label || '';

      setOptionsIds(options);
      setCurrentValue(initialValue);
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
              if (field.nestedFields.length) {
                onFieldsExtend(field, currentValue);
                setCurrentValue(!currentValue);
              }
            }}
            size='large'
            startIcon={<Icon className='button-icon' style={{ color: field.noOptionsIconColor }} />}
            variant='outlined'
          >
            { field.label }
          </Button>
        );
      }
      case 'dropdown': {
        const Icon = field.noOptionsIcon;

        return optionsIds?.length ? (
          <Autocomplete
            className={classes.input}
            disabled={field.isDisabled}
            getOptionLabel={(item) => field.options?.find((option) => option._id === item)?.label || ''}
            getOptionSelected={(option, value) => value === '' || value === option}
            inputValue={currentValue}
            key={field.id}
            noOptionsText={
              field.nestedFields.length && (
                <Button
                  onMouseDown={() => {
                    onFieldsExtend(field, false, currentValue);
                  }}
                  size='large'
                  startIcon={<Icon className='button-icon' style={{ color: field.noOptionsIconColor }} />}
                  variant='outlined'
                >
                  { field.noOptionsText }
                </Button>
              )
            }
            onChange={(ev, value) => onInputChange(field.id, value)}
            onInputChange={(event, value) => setCurrentValue(value)}
            options={optionsIds}
            renderInput={(params) => (
              <TextField
                {...params}
                error={field.isInvalid}
                label={field.label}
                variant='filled'
              />
            )}
            required={field.isRequired}
            value={field.value || ''}
          />
        ) : null;
      }
      case 'multiline':
      default:
        return (
          <TextField
            className={classes.input}
            disabled={field.isDisabled}
            error={field.isInvalid}
            id={field.id}
            key={field.id}
            label={field.label}
            multiline={field.type === 'multiline'}
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

export default Field;
