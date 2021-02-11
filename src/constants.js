
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

export const fieldsConfig = {
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
    isRequired: true,
    label: labels.NAME
  },
  price: {
    id: 'price',
    label: labels.PRICE
  },
  surname: {
    id: 'surname',
    isRequired: true,
    label: labels.SURNAME
  },
  technician: {
    id: 'technician',
    label: labels.TECHNICIAN
  },
  telephone: {
    id: 'telephone',
    isRequired: true,
    label: labels.TELEPHONE
  },
  treatment: {
    id: 'treatment',
    label: labels.TREATMENT
  }
};
export const formTypes = {
  appointment: ['client', 'appointment', 'date', 'treatment', 'technician', 'control', 'price', 'address'],
  client: ['name', 'surname', 'telephone', 'address']
};
