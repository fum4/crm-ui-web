import store from './store';
import {
  appointmentsSlice,
  fetchAppointments,
  insertAppointment,
  editAppointment,
  removeAppointment
} from './appointmentsSlice';
import {
  clientsSlice,
  fetchClients,
  insertClient,
  editClient,
  removeClient
} from './clientsSlice';
import {
  useAllClients,
  useAllAppointments,
} from './selectors';

export {
  store,
  appointmentsSlice,
  fetchAppointments,
  insertAppointment,
  editAppointment,
  removeAppointment,
  clientsSlice,
  fetchClients,
  insertClient,
  editClient,
  removeClient,
  useAllClients,
  useAllAppointments,
};
