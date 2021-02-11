export const labels = {
  ADDRESS: 'Adresă',
  ADD_APPOINTMENT: 'Adaugă programare',
  ADD_CLIENT: 'Adaugă client',
  ADD_EXISTING_CLIENT: 'Alegeți pacient existent',
  APPOINTMENT: 'Programare',
  CANCEL: 'Renunță',
  CLIENT: 'Pacient',
  CONTROL: 'Control',
  DATE: 'Data',
  EDIT_APPOINTMENT: 'Modifică programare',
  EDIT_CLIENT: 'Modifică client',
  NAME: 'Nume',
  PHONE: 'Telefon',
  PRICE: 'Preț',
  SURNAME: 'Prenume',
  TECHNICIAN: 'Tehnician',
  TREATMENT: 'Tratament'
};

export const fieldsConfig = {
  addAppointment: {
    id: 'addAppointment',
    items: ['appointment', 'date', 'treatment', 'technician', 'control', 'price'],
    label: labels.ADD_APPOINTMENT,
    labelValues: [labels.ADD_CLIENT, labels.CANCEL],
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
    label: labels.SURNAME
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
