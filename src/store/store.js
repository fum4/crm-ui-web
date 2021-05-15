import { configureStore } from '@reduxjs/toolkit';
import { generalSlice } from './generalSlice';
import { clientsSlice } from './clientsSlice';
import { appointmentsSlice } from './appointmentsSlice';
import { notificationsSlice } from './notificationsSlice';

export default configureStore({
  reducer: {
    general: generalSlice.reducer,
    clients: clientsSlice.reducer,
    appointments: appointmentsSlice.reducer,
    notifications: notificationsSlice.reducer
  }
});
