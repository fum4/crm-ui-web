import Field from './Field';
import { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { getFormConfig, splitByDelimiter, getOptionsForNestedFieldsVisibility, isMobile } from 'services/utils';

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
    width: `${isMobile() ? 90 : 60}%`
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15)
  },
  footer: {
    padding: 20,
    display: 'flex'
  }
}));

const Form = ({ onSubmit, formFields, submitText }) => {
  const classes = useStyles();
  const [fields, setFields] = useState(formFields);

  const onFieldsExtend = (field, isHidden, value) => {
    const options = getOptionsForNestedFieldsVisibility(field.nestedFields, isHidden);

    options.push({
      id: field.id,
      key: 'label',
      value: field.labelValues[isHidden ? 0 : 1]
    });

    if (field.type === 'dropdown') {
      options.push({
        id: field.id,
        key: 'value',
        value: ''
      });
    }

    if (field.type === 'button') {
      options.push({
        id: field.id,
        key: 'icon',
        value: field.iconValues[isHidden ? 0 : 1]
      });
      options.push({
        id: field.id,
        key: 'color',
        value: field.colorValues[isHidden ? 0 : 1]
      })
    }

    if (field.splitOnExtend) {
      let valueToSplit = value;

      field.splitOnExtend.children.forEach((childField, index) => {
        const extracted = splitByDelimiter(valueToSplit, field.splitOnExtend.delimiters[index]);

        options.push({
          id: childField,
          key: 'value',
          value: extracted.firstChunk
        });

        valueToSplit = extracted.secondChunk;
      });
    }

    setFields(getFormConfig(fields, options));
  };

  const onInputChange = (key, value) => {
    const options = [];

    const updatedFields = fields.map((field) => {
      if (field.id === key) {
        field.value = value;

        if (field.validator) {
          options.push({
            id: key,
            key: 'isInvalid',
            value: !field.validator(value)
          });
        }

        if (field.nestedFields?.length) {
          field.nestedFields?.forEach((item) => {
            options.push({
              id: item,
              key: 'isHidden',
              value: true
            });
          });

          options.push({
            id: key,
            key: 'label',
            value: field.labelValues[0]
          });
        }
      }

      return field;
    });

    setFields(getFormConfig(updatedFields, options));
  };

  const validateForm = () => {
    const options = [];
    let isValid = true;

    fields?.forEach((field) => {
      if (field.validator && !field.isHidden) {
        isValid = isValid && field.validator(field.value);

        options.push({
          id: field.id,
          key: 'isInvalid',
          value: !field.validator(field.value)
        });
      }
    });

    setFields(getFormConfig(fields, options));

    return isValid;
  }

  const handleSubmit = () => {
    const isFormValid = validateForm();
    const fieldsToSubmit = fields?.filter((field) => !field.isHidden);

    if (isFormValid) {
      onSubmit({ ...fieldsToSubmit });
    }
  };

  return (
    <form autoComplete='off' className={classes.root}>
      {
        fields?.map((field) => (
          <Field
            classes={classes}
            field={field}
            key={field.id}
            onFieldsExtend={onFieldsExtend}
            onInputChange={onInputChange}
          />
        ))
      }
      <div className={classes.footer}>
        <Button
          color='primary'
          onClick={handleSubmit}
          size='large'
          variant='contained'
        >
          { submitText }
        </Button>
      </div>
    </form>
  );
};

export default Form;
