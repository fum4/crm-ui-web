import _ from 'lodash';

export const getFormValues = (baseFields, payload) => {
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

export const getCurrentDate = () => new Date().toISOString().slice(0, -8);

export const splitByDelimiter = (value, delimiter) => {
  if (delimiter) {
    const firstChunk = value.slice(0, value.indexOf(delimiter)).trim();
    const secondChunk = value.slice(value.indexOf(delimiter)).trim();

    return { firstChunk, secondChunk };
  }

  return { firstChunk: value };
}

export const validators = {
  isNumber: (value) => typeof value === 'number',
  isPhoneNumber: (value) => value.match(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|-)?([0-9]{3}(\s|\.|-|)){2}$/),
  isPresent: (value) => value?.length
}
