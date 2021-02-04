import _ from 'lodash';

export const getFormValues = (baseFields, payload) => {
  const fields = _.cloneDeep(baseFields);

  payload?.forEach((item) => {
    const currentField = fields.find((field) => field.id === item.id);

    currentField[item.key] = item.value;
  });

  return fields;
};

export const serializeForm = (payload) => {
  return Object.keys(payload).reduce(
    (result, index) => ({
      ...result,
      [payload[index].id]: payload[index].value,
    }),
    [],
  );
};
