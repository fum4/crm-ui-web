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
  ADD_APPOINTMENT: 'Adauga programare',
  ADD_CLIENT: 'Adauga client',
  APPOINTMENT: 'Programare',
  CLIENT: 'Client',
  EDIT_APPOINTMENT: 'Modifica programare',
  EDIT_CLIENT: 'Adauga client'
};
