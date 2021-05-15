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
  notificationsSlice,
  addNotification,
  clearNotification
} from './notificationsSlice';
import {
  generalSlice,
  authenticate,
  setLoading,
} from './generalSlice';
import {
  useClients,
  useAppointments,
} from './selectors';

export {
  store,
  generalSlice,
  notificationsSlice,
  appointmentsSlice,
  clientsSlice,
  fetchAppointments,
  fetchClients,
  insertAppointment,
  insertClient,
  editAppointment,
  editClient,
  removeAppointment,
  removeClient,
  authenticate,
  setLoading,
  addNotification,
  clearNotification,
  useClients,
  useAppointments
};
