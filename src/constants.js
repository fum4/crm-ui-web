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
  ADD_APPOINTMENT: 'Adaugă programare',
  ADD_CLIENT: 'Adaugă client',
  APPOINTMENT: 'Programare',
  CLIENT: 'Client',
  EDIT_APPOINTMENT: 'Modifică programare',
  EDIT_CLIENT: 'Modifică client'
};

const types={
  addappoint: [pacient,labla],
  addapointfarapacient:[pacient, nume, prenume, adresa,]

}