import FormItem from '../FormItem';
import { useState } from 'react';
import { Button, Dialog, makeStyles } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { getFormValues, splitByDelimiter, getOptionsForNestedFieldsVisibility } from '../../services/utils';
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

const FormModal = ({ buttonColor, setShowModal, successHandler, title, formFields, onSubmit, submitText }) => {
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

    const formValues = getFormValues(fields, options);

    setFields(formValues);
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

    const formValues = getFormValues(updatedFields, options);

    setFields(formValues);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    const isFormValid = validateForm();
    const fieldsToSubmit = fields?.filter((field) => !field.isHidden);

    if (isFormValid) {
      onSubmit({ ...fieldsToSubmit }).then(() => {
        hideModal();
        successHandler();
      });
    }
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

    const formValues = getFormValues(fields, options);
    setFields(formValues);

    return isValid;
  }

  return (
    <Dialog className='modal' fullWidth maxWidth='md' open={true}>
      <div className='modal-header'>
        <div className='close-btn-container'>
          <FaTimes className='close-btn' onClick={() => hideModal()} size={35} />
        </div>
        <div className='title-container'>
          <h1>{title}</h1>
        </div>
      </div>
      <form autoComplete='off' className={classes.root}>
        {
          fields?.map((field) => (
            <FormItem
              classes={classes}
              field={field}
              key={field.id}
              onFieldsExtend={onFieldsExtend}
              onInputChange={onInputChange}
            />
          ))
        }
        <div className='modal-footer'>
          <Button color={buttonColor} onClick={() => handleSubmit()} size='large' variant='contained'>
            { submitText }
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default FormModal;
