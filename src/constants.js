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
  CANCEL: 'Renunță',
  CANCEL_ADD_APPOINTMENT: 'Fără programare',
  CANCEL_ADD_CONTROL: 'Fără control',
  CLIENT: 'Pacient',
  CONTROL: 'Control',
  DATE: 'Data',
  DELETE: 'Șterge',
  DELETE_2: 'Anulează',
  DELETE_APPOINTMENT: 'Șterge programare',
  DELETE_APPOINTMENT_MESSAGE: 'Ești sigur că vrei să anulezi programarea?',
  DELETE_CONTROL: 'Șterge control',
  DELETE_CONTROL_MESSAGE: 'Ești sigur că vrei să anulezi controlul?',
  DELETE_CLIENT: 'Șterge client',
  DELETE_CLIENT_MESSAGE: 'Ești sigur că vrei să ștergi clientul?',
  EDIT: 'Modifică',
  EDIT_APPOINTMENT: 'Modifică programare',
  EDIT_CONTROL: 'Modifică control',
  EDIT_CLIENT: 'Modifică pacient',
  NAME: 'Nume',
  PHONE: 'Telefon',
  PRICE: 'Preț',
  SURNAME: 'Prenume',
  TECHNICIAN: 'Tehnician',
  TREATMENT: 'Tratament',
  LOGIN: 'Autentificare',
  REGISTER: 'Înregistrare',
  LOGIN_ERROR: 'Autentificarea a eșuat',
  REGISTER_ERROR: 'Înregistrarea a eșuat'
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
    isRequired: true,
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
  }
};

export const formTypes = {
  appointment: ['client', 'appointment', 'treatment', 'technician', 'price', 'addControl'],
  control: ['client', 'appointment', 'treatment', 'technician', 'price', 'date', 'addControl'],
  client: ['name', 'surname', 'phone', 'address', 'addAppointment']
};
