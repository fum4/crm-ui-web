import { configureStore } from '@reduxjs/toolkit';
import { clientsSlice } from './clientsSlice';
import { appointmentsSlice } from './appointmentsSlice';
import { notificationsSlice } from './notificationsSlice';

export default configureStore({
  reducer: {
    clients: clientsSlice.reducer,
    appointments: appointmentsSlice.reducer,
    notifications: notificationsSlice.reducer
  }
});
