import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  updateControl,
  deleteControl
} from '../services/network';
import { fetchClients } from './';
import { addNotification } from './notificationsSlice';

const saveData = (state, action) => {
  state.data = action.payload.data;
  state.status = 'idle';
}

const setLoading = (state) => {
  state.status = 'loading';
};

export const fetchAppointments = createAsyncThunk('appointments/get', async (payload, thunkAPI) => {
  const appointments = await getAppointments();

  addNotification(appointments, thunkAPI);

  return appointments.data;
});

export const insertAppointment = createAsyncThunk('appointments/add', async (payload, thunkAPI) => {
  const appointments = await addAppointment(payload);

  thunkAPI.dispatch(fetchClients());

  addNotification(appointments, thunkAPI);

  return appointments.data;
});

export const editAppointment = createAsyncThunk('appointments/edit', async (payload, thunkAPI) => {
  let appointments;

  if (payload.type === 'control') { // TODO: should refactor
    appointments = await updateControl(payload);
  } else {
    appointments = await updateAppointment(payload);
  }

  thunkAPI.dispatch(fetchClients());

  addNotification(appointments, thunkAPI);

  return appointments.data;
});

export const removeAppointment = createAsyncThunk('appointments/delete', async (payload, thunkAPI) => {
  let appointments;

  if (payload.type === 'control') { // TODO: should refactor
    appointments = await deleteControl(payload);
  } else {
    appointments = await deleteAppointment(payload);
  }

  thunkAPI.dispatch(fetchClients());

  addNotification(appointments, thunkAPI);

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
      .addCase(fetchAppointments.fulfilled, saveData)
      .addCase(insertAppointment.fulfilled, saveData)
      .addCase(editAppointment.fulfilled, saveData)
      .addCase(removeAppointment.fulfilled, saveData)
      .addCase(fetchAppointments.pending, setLoading)
      .addCase(insertAppointment.pending, setLoading)
      .addCase(editAppointment.pending, setLoading)
      .addCase(removeAppointment.pending, setLoading)
  },
});

const reducer = appointmentsSlice.reducer;
const actions = { ...appointmentsSlice.actions };

export default {
  actions,
  reducer
};
