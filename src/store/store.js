import { configureStore } from '@reduxjs/toolkit';
import { clientsSlice } from './clientsSlice';
import { appointmentsSlice } from './appointmentsSlice';

export default configureStore({
  reducer: {
    clients: clientsSlice.reducer,
    appointments: appointmentsSlice.reducer
  }
});