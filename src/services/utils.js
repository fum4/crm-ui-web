import _ from 'lodash';
import moment from 'moment';
import { fieldsConfig, labels, mobileMediaQueryBreakpoint } from '../constants';

export const getOptionsForNestedFieldsVisibility = (names, shouldHide) => {
  const options = names.map((fieldName) => {
    const fieldOptions = [{
      id: fieldName,
      key: 'isHidden',
      value: shouldHide
    }];

    const fieldConfig = fieldsConfig[fieldName];
    const nestedFields = fieldConfig.nestedFields;

    if (shouldHide && nestedFields?.length) {
      const nestedOptions = getOptionsForNestedFieldsVisibility(nestedFields, shouldHide);

      if (fieldConfig.type === 'button') {
        nestedOptions.push({
          id: fieldConfig.id,
          key: 'label',
          value: fieldConfig.labelValues[0]
        });
        nestedOptions.push({
          id: fieldConfig.id,
          key: 'color',
          value: fieldConfig.colorValues[0]
        });
        nestedOptions.push({
          id: fieldConfig.id,
          key: 'icon',
          value: fieldConfig.iconValues[0]
        });
        nestedOptions.push({
          id: fieldConfig.id,
          key: 'value',
          value: false
        });
      }

      fieldOptions.push(...nestedOptions);
    }

    return fieldOptions;
  });

  return _.flattenDeep(options);
}

export const extractFields = (names, shouldHideParent) => {
  return names.map((fieldName) => {
    let nestedFields = [];

    if (fieldsConfig[fieldName].nestedFields?.length) {
      nestedFields = fieldsConfig[fieldName].nestedFields.map((nestedFieldName) => {
        const nestedField = { ...fieldsConfig[nestedFieldName], isHidden: true };

        if (nestedField.nestedFields?.length) {
          const deeplyNestedFields = extractFields([nestedField.id], true);

          return _.flatten(deeplyNestedFields);
        }

        return nestedField;
      });
    }

    return [{ ...fieldsConfig[fieldName], isHidden: shouldHideParent }, ..._.flattenDeep(nestedFields)];
  })
};

export const getFormConfig = (baseFields, payload) => {
  const fields = _.cloneDeep(baseFields);

  payload.forEach((item) => {
    if (item.id === '_id') {
      fields.push({
        id: '_id',
        value: item.value
      });
    } else {
      const currentField = fields.find((field) => field.id === item.id);

      currentField[item.key] = item.value;
    }
  });

  return fields;
};

export const serializeForm = (payload) => {
  return Object.keys(payload).reduce(
      (result, index) => ({
        ...result,
        [payload[index].id]: payload[index].value
      }),
      []
  );
};

export const getCurrentDate = () => moment().format('YYYY-MM-DDTHH:mm');

export const splitByDelimiter = (value, delimiter) => {
  if (value) {
    if (delimiter) {
      const firstChunk = value.slice(0, value.indexOf(delimiter)).trim();
      const secondChunk = value.slice(value.indexOf(delimiter)).trim();

      return { firstChunk, secondChunk };
    }

    return { firstChunk: value };
  }

  return {};
};

export const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 10) {
    const firstChunk = phoneNumber.slice(0, 4);
    const secondChunk = phoneNumber.slice(4, 7);
    const thirdChunk = phoneNumber.slice(7, 10);

    return `(${firstChunk}) ${secondChunk} ${thirdChunk}`;
  }

  if (phoneNumber.length === 12) {
    const firstChunk = phoneNumber.slice(0, 4);
    const secondChunk = phoneNumber.slice(5, 8);
    const thirdChunk = phoneNumber.slice(9, 12);

    return `(${firstChunk}) ${secondChunk} ${thirdChunk}`;
  }

  return phoneNumber;
};

export const formatPrettyDate = (dateAsString) => {
  const date = moment(dateAsString);
  const month = date.format('MMMM').toUpperCase();
  const dayText = date.format('dddd').toUpperCase();
  const dayNumber = date.date();

  return `${labels.DAYS[dayText]}, ${dayNumber} ${labels.MONTHS[month]}`;
};

export const getHourFromDate = (date) => {
  const hourAndMinutes = date.slice(date.indexOf('T') + 1);
  const hour = hourAndMinutes.slice(0, hourAndMinutes.indexOf(':'));
  const minutes = hourAndMinutes.slice(hourAndMinutes.indexOf(':') + 1);

  return { hour, minutes };
};

export const validators = {
  isNumber: (value) => typeof value === 'number',
  isPhoneNumber: (value) => value.match(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|-)?([0-9]{3}(\s|\.|-|)){2}$/),
  isPresent: (value) => value?.length
};

export const getDialogTitle = (action, type) => {
  return labels[`${action.toUpperCase()}_${type.toUpperCase()}${action === 'delete' ? '_MESSAGE' : ''}`];
};

export const getDialogSubmitButtonText = (action, type) => {
  const shouldAddLabelExtension = type !== 'client' && action === 'delete';

  return labels[`${action.toUpperCase()}${shouldAddLabelExtension ? '_2' : ''}`];
};

export const isMobile = () => window.matchMedia(`(max-width: ${mobileMediaQueryBreakpoint}px)`).matches;
