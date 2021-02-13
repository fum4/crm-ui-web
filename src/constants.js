import { AlarmOff, AccessTime, AddCircle } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { validators } from './services/utils';

export const labels = {
  ADDRESS: 'Adresă',
  ADD_APPOINTMENT: 'Adaugă programare',
  ADD_CLIENT: 'Adaugă pacient',
  ADD_EXISTING_CLIENT: 'Alegeți pacient existent',
  APPOINTMENT: 'Programare',
  CANCEL: 'Renunță',
  CANCEL_ADD_APPOINTMENT: 'Fără programare',
  CLIENT: 'Pacient',
  CONTROL: 'Control',
  DATE: 'Data',
  EDIT_APPOINTMENT: 'Modifică programare',
  EDIT_CLIENT: 'Modifică pacient',
  NAME: 'Nume',
  PHONE: 'Telefon',
  PRICE: 'Preț',
  SURNAME: 'Prenume',
  TECHNICIAN: 'Tehnician',
  TREATMENT: 'Tratament'
};

export const fieldsConfig = {
  addAppointment: {
    color: 'primary',
    colorValues: ['primary', 'secondary'],
    icon: AccessTime,
    iconValues: [AccessTime, AlarmOff],
    id: 'addAppointment',
    items: ['appointment', 'date', 'treatment', 'technician', 'control', 'price'],
    label: labels.ADD_APPOINTMENT,
    labelValues: [labels.ADD_APPOINTMENT, labels.CANCEL_ADD_APPOINTMENT],
    type: 'button'
  },
  address: {
    id: 'address',
    label: labels.ADDRESS
  },
  appointment: {
    id: 'appointment',
    label: labels.APPOINTMENT
  },
  client: {
    id: 'client',
    isRequired: true,
    items: ['name', 'surname', 'phone', 'address'],
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
    label: labels.CONTROL
  },
  date: {
    id: 'date',
    isRequired: true,
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
  appointment: ['client', 'appointment', 'date', 'treatment', 'technician', 'control', 'price'],
  client: ['name', 'surname', 'phone', 'address', 'addAppointment']
};
