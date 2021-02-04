export const addClientFields = [
  {
    id: 'name',
    label: 'Nume',
    isRequired: true
  },
  {
    id: 'surname',
    label: 'Prenume',
    isRequired: true
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
  },
  {
    id: 'date',
    label: 'Data'
  }
];

export const addAppointmentFields = [
  {
    id: 'client',
    label: 'Pacient',
    isDropdown: true,
    isRequired: true
  },
  {
    id: 'appointment',
    label: 'Programare'
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
  },
  {
    id: 'date',
    label: 'Data',
    isRequired: true
  }
];

export const labels = {
  CLIENT: 'Client',
  ADD_CLIENT: 'Adauga client',
  EDIT_CLIENT: 'Adauga client',
  APPOINTMENT: 'Programare',
  ADD_APPOINTMENT: 'Adauga programare',
  EDIT_APPOINTMENT: 'Modifica programare'
};
