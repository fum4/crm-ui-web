import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  updateControl,
  deleteControl
} from '../services/network';
import { fetchClients } from './clientsSlice';

export const fetchAppointments = createAsyncThunk('appointments/get', async (payload, thunkAPI) => {
  const appointments = await getAppointments();

  thunkAPI.dispatch(fetchClients());

  return appointments.data;
});

export const insertAppointment = createAsyncThunk('appointments/add', async (payload, thunkAPI) => {
  const appointments = await addAppointment(payload);

  thunkAPI.dispatch(fetchClients());

  return appointments.data;
});

export const editAppointment = createAsyncThunk('appointments/edit', async (payload, thunkAPI) => {
  let appointments;

  if (payload.date) { // means is control, not appointment; should refactor this
    appointments = await updateControl(payload);
  } else {
    appointments = await updateAppointment(payload);
  }

  thunkAPI.dispatch(fetchClients());

  return appointments.data;
});

export const removeAppointment = createAsyncThunk('appointments/delete', async (payload, thunkAPI) => {
  let appointments;

  if (payload.date) { // means is control, not appointment; should refactor this
    appointments = await deleteControl(payload);
  } else {
    appointments = await deleteAppointment(payload);
  }

  thunkAPI.dispatch(fetchClients());

  return appointments.data;
});

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    data: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(insertAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(insertAppointment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(editAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editAppointment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(removeAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
  },
});

const reducer = appointmentsSlice.reducer;
const actions = { ...appointmentsSlice.actions };

export default {
  actions,
  reducer
};
