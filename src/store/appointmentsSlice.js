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
import { addNotification, addErrorNotification } from './notificationsSlice';
import { labels } from '../constants';

const saveData = (state, action) => {
  if (action?.payload?.data) {
    state.data = action.payload.data;
  }

  state.status = 'idle';
}

const setLoading = (state) => {
  state.status = 'loading';
};

export const fetchAppointments = createAsyncThunk('appointments/get', async (payload, thunkAPI) => {
  try {
    const appointments = await getAppointments();

    return appointments.data;
  } catch(err) {
    addErrorNotification(thunkAPI, labels.ERROR_MESSAGES.FETCH_APPOINTMENTS);
  }
});

export const insertAppointment = createAsyncThunk('appointments/add', async (payload, thunkAPI) => {
  try {
    const appointments = await addAppointment(payload);

    thunkAPI.dispatch(fetchClients());

    addNotification(appointments, thunkAPI);

    return appointments.data;
  } catch(err) {
    addErrorNotification(thunkAPI, labels.ERROR_MESSAGES.INSERT_APPOINTMENT);
  }
});

export const editAppointment = createAsyncThunk('appointments/edit', async (payload, thunkAPI) => {
  const isControl = payload.type === 'control';
  let appointments;

  try {
    if (isControl) {
      appointments = await updateControl(payload);
    } else {
      appointments = await updateAppointment(payload);
    }

    thunkAPI.dispatch(fetchClients());

    addNotification(appointments, thunkAPI);

    return appointments.data;
  } catch(err) {
    addErrorNotification(thunkAPI, labels.ERROR_MESSAGES[isControl ? 'EDIT_CONTROL' : 'EDIT_APPOINTMENT']);
  }
});

export const removeAppointment = createAsyncThunk('appointments/delete', async (payload, thunkAPI) => {
  const isControl = payload.type === 'control';
  let appointments;

  try {
    if (isControl) {
      appointments = await deleteControl(payload);
    } else {
      appointments = await deleteAppointment(payload);
    }

    thunkAPI.dispatch(fetchClients());

    addNotification(appointments, thunkAPI);

    return appointments.data;
  } catch(err) {
    addErrorNotification(thunkAPI, labels.ERROR_MESSAGES[isControl ? 'REMOVE_CONTROL' : 'REMOVE_APPOINTMENT']);
  }
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
