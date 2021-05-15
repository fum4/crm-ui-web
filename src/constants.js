import { AlarmOff, AccessTime, AddCircle } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { validators } from './services/utils';

export const labels = {
  ADD: 'Adaugă',
  ADDRESS: 'Adresă',
  ADD_APPOINTMENT: 'Adaugă programare',
  ADD_CLIENT: 'Adaugă pacient',
  ADD_CONTROL: 'Adaugă control',
  ADD_EXISTING_CLIENT: 'Alegeți pacient existent',
  APPOINTMENT: 'Programare',
  APPOINTMENTS: 'Programări',
  CANCEL: 'Renunță',
  CANCEL_ADD_APPOINTMENT: 'Fără programare',
  CANCEL_ADD_CONTROL: 'Fără control',
  CLIENT: 'Pacient',
  CLIENTS: 'Pacienți',
  COMMENTS: 'Comentarii',
  CONTROL: 'Control',
  DATE: 'Data',
  DAYS: {
    MONDAY: 'Luni',
    TUESDAY: 'Marți',
    WEDNESDAY: 'Miercuri',
    THURSDAY: 'Joi',
    FRIDAY: 'Vineri',
    SATURDAY: 'Sâmbătă',
    SUNDAY: 'Duminică',
    MONDAY_NO_SPECIAL_CHARS: 'luni',
    TUESDAY_NO_SPECIAL_CHARS: 'marti',
    WEDNESDAY_NO_SPECIAL_CHARS: 'miercuri',
    THURSDAY_NO_SPECIAL_CHARS: 'joi',
    FRIDAY_NO_SPECIAL_CHARS: 'vineri',
    SATURDAY_NO_SPECIAL_CHARS: 'sambata',
    SUNDAY_NO_SPECIAL_CHARS: 'duminica',
  },
  DELETE: 'Da, șterge',
  DELETE_2: 'Da, anulează',
  DELETE_APPOINTMENT: 'Șterge programare',
  DELETE_APPOINTMENT_MESSAGE: 'Ești sigur că vrei să anulezi programarea?',
  DELETE_CONTROL: 'Șterge control',
  DELETE_CONTROL_MESSAGE: 'Ești sigur că vrei să anulezi controlul?',
  DELETE_CLIENT: 'Șterge client',
  DELETE_CLIENT_MESSAGE: 'Ești sigur că vrei să ștergi clientul?',
  DETAILS: 'Detalii',
  EDIT: 'Modifică',
  EDIT_APPOINTMENT: 'Modifică programare',
  EDIT_CONTROL: 'Modifică control',
  EDIT_CLIENT: 'Modifică pacient',
  ERROR_MESSAGES: {
    EDIT_APPOINTMENT: 'Programarea nu a putut fi modificată.',
    EDIT_CONTROL: 'Controlul nu a putut fi modificat.',
    EDIT_CLIENT: 'Pacientul nu a putut fi modificat.',
    INSERT_APPOINTMENT: 'Programarea nu a putut fi adăugată.',
    INSERT_CLIENT: 'Pacientul nu a putut fi adăugat.',
    REMOVE_APPOINTMENT: 'Programarea nu a putut fi anulată.',
    REMOVE_CONTROL: 'Controlul nu a putut fi anulat.',
    REMOVE_CLIENT: 'Pacientul nu a putut fi șters.',
    FETCH_APPOINTMENTS: 'Programările nu au putut fi actualizate.',
    FETCH_CLIENTS: 'Pacienții nu au putut fi actualizați.',
  },
  GENERIC_ERROR_MESSAGE: 'Ne pare rău, a apărut o eroare.',
  HOUR: 'Ora',
  LOGIN: 'Autentificare',
  LOGIN_ERROR: 'Autentificarea a eșuat',
  MONTHS: {
    JANUARY: 'ianuarie',
    FEBRUARY: 'februarie',
    MARCH: 'martie',
    APRIL: 'aprilie',
    MAY: 'mai',
    JUNE: 'iunie',
    JULY: 'iulie',
    AUGUST: 'august',
    SEPTEMBER: 'septembrie',
    OCTOBER: 'octombrie',
    NOVEMBER: 'noiembrie',
    DECEMBER: 'decembrie'
  },
  NAME: 'Nume',
  NO_ACTIVE_APPOINTMENTS: 'Nu mai aveți nicio programare.',
  PHONE: 'Telefon',
  PRICE: 'Preț',
  SEARCH: 'Caută',
  SHOW_INACTIVE_APPOINTMENTS: 'Afișează programările inactive',
  SURNAME: 'Prenume',
  TECHNICIAN: 'Tehnician',
  TREATMENT: 'Tratament',
  TODAY: 'Astăzi',
  USER: 'Utilizator',
  PASSWORD: 'Parolă',
  REGISTER: 'Înregistrare',
  REGISTER_ERROR: 'Înregistrarea a eșuat',
};

export const fieldsConfig = {
  addAppointment: {
    color: 'primary',
    colorValues: ['primary', 'secondary'],
    icon: AccessTime,
    iconValues: [AccessTime, AlarmOff],
    id: 'addAppointment',
    nestedFields: ['appointment', 'treatment', 'technician', 'price', 'addControl'],
    label: labels.ADD_APPOINTMENT,
    labelValues: [labels.ADD_APPOINTMENT, labels.CANCEL_ADD_APPOINTMENT],
    type: 'button'
  },
  addControl: {
    color: 'primary',
    colorValues: ['primary', 'secondary'],
    icon: AccessTime,
    iconValues: [AccessTime, AlarmOff],
    id: 'addControl',
    nestedFields: ['control'],
    label: labels.ADD_CONTROL,
    labelValues: [labels.ADD_CONTROL, labels.CANCEL_ADD_CONTROL],
    type: 'button'
  },
  address: {
    id: 'address',
    label: labels.ADDRESS
  },
  appointment: {
    id: 'appointment',
    isRequired: true,
    label: labels.APPOINTMENT,
    type: 'datetime-local'
  },
  client: {
    id: 'client',
    isRequired: true,
    nestedFields: ['name', 'surname', 'phone', 'address'],
    label: labels.CLIENT,
    labelValues: [labels.CLIENT, labels.ADD_EXISTING_CLIENT],
    noOptionsIcon: AddCircle,
    noOptionsIconColor: green[500],
    noOptionsText: labels.ADD_CLIENT,
    splitOnExtend: {
      delimiters: [' '],
      children: ['name', 'surname']
    },
    type: 'dropdown'
  },
  control: {
    id: 'control',
    label: labels.CONTROL,
    type: 'datetime-local'
  },
  date: {
    id: 'date',
    label: labels.DATE,
    type: 'datetime-local'
  },
  name: {
    id: 'name',
    isRequired: true,
    label: labels.NAME,
    validator: validators.isPresent
  },
  phone: {
    id: 'phone',
    label: labels.PHONE
  },
  price: {
    id: 'price',
    label: labels.PRICE
  },
  surname: {
    id: 'surname',
    isRequired: true,
    label: labels.SURNAME,
    validator: validators.isPresent
  },
  technician: {
    id: 'technician',
    label: labels.TECHNICIAN
  },
  treatment: {
    id: 'treatment',
    label: labels.TREATMENT
  },
  comments: {
    id: 'comments',
    label: labels.COMMENTS,
    type: 'multiline'
  }
};

export const formTypes = {
  appointment_add: ['client', 'appointment', 'treatment', 'technician', 'price', 'addControl'],
  appointment_edit: ['client', 'appointment', 'treatment', 'technician', 'price', 'addControl'],
  control_add: ['client', 'appointment', 'treatment', 'technician', 'price', 'date', 'addControl'],
  control_edit: ['client', 'appointment', 'treatment', 'technician', 'price', 'date', 'addControl'],
  client_add: ['name', 'surname', 'phone', 'address', 'comments', 'addAppointment'],
  client_edit: ['name', 'surname', 'phone', 'address', 'comments']
};

export const mobileMediaQueryBreakpoint = 1099;
export const desktopMediaQueryBreakpoint = 1100;
