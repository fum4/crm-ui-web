import _ from 'lodash';
import { DateTime } from 'luxon';

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

// export const getCurrentDate = () => console.log(new Date().toISOString().slice(0, -8));

export const getCurrentDate = () => {
  const today = new Date();
  // const currentDate = new Date();
  // const timezoneOffset = 2;
  // const millisecondsOffset = timezoneOffset * 60 * 60 * 1000;
  // const today = new Date(currentDate + millisecondsOffset);

  const year = today.getFullYear();
  // const hour = today.getHours() + 2;
  const hour = today.getHours();
  const minutes = today.getMinutes();

  let month = today.getMonth() + 1;
  let day = today.getDay();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}T${hour}:${minutes}`;
}
