export const addClientFields = [
  {
    id: 'name',
    isRequired: true,
    label: 'Nume'
  },
  {
    id: 'surname',
    isRequired: true,
    label: 'Prenume'
  },
  {
    id: 'address',
    label: 'Adresă'
  },
  {
    id: 'appointment',
    label: 'Programare'
  },
  {
    id: 'date',
    label: 'Data'
  },
  {
    id: 'phone',
    label: 'Telefon'
  },
  {
    id: 'treatment',
    label: 'Tratament'
  },
  {
    id: 'technician',
    label: 'Tehnician'
  },
  {
    id: 'control',
    label: 'Control'
  },
  {
    id: 'price',
    label: 'Preț'
  }
];

export const addAppointmentFields = [
  {
    id: 'client',
    isDropdown: true,
    isRequired: true,
    label: 'Pacient'
  },
  {
    id: 'name',
    isHidden: true,
    label: 'Nume'
  },
  {
    id: 'surname',
    isHidden: true,
    label: 'Prenume'
  },
  {
    id: 'appointment',
    label: 'Programare'
  },
  {
    id: 'date',
    isRequired: true,
    label: 'Data'
  },
  {
    id: 'treatment',
    label: 'Tratament'
  },
  {
    id: 'technician',
    label: 'Tehnician'
  },
  {
    id: 'control',
    label: 'Control'
  },
  {
    id: 'price',
    label: 'Preț'
  }
];

export const labels = {
  ADDRESS: 'Adresă',
  ADD_APPOINTMENT: 'Adaugă programare',
  ADD_CLIENT: 'Adaugă client',
  APPOINTMENT: 'Programare',
  CLIENT: 'Client',
  CONTROL: 'Control',
  DATE: 'Data',
  EDIT_APPOINTMENT: 'Modifică programare',
  EDIT_CLIENT: 'Modifică client',
  NAME: 'Nume',
  PATIENT: 'Pacient',
  PRICE: 'Preț',
  SURNAME: 'Prenume',
  TECHNICIAN: 'Tehnician',
  TELEPHONE: 'Telefon',
  TREATMENT: 'Tratament'
};

const fields = {
  addAppointment: {
    id: 'addAppointment',
    items: ['appointment', 'date', 'treatment', 'technician', 'control', 'price'],
    label: labels.ADD_APPOINTMENT,
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
    items: ['name', 'surname', 'telephone', 'address'],
    label: labels.PATIENT,
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
    label: labels.NAME
  },
  price: {
    id: 'price',
    label: labels.PRICE
  },
  surname: {
    id: 'surname',
    label: labels.SURNAME
  },
  technician: {
    id: 'technician',
    label: labels.TECHNICIAN
  },
  telephone: {
    id: 'telephone',
    label: labels.TELEPHONE
  },
  treatment: {
    id: 'treatment',
    label: labels.TREATMENT
  }
};
const fieldsConfig = {
  appointment: ['client', 'appointment', 'date', 'treatment', 'technician', 'control', 'price'],
  client: ['name', 'surname', 'telephone', 'address']
};
