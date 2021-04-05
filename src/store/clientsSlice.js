import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addClient, deleteClient, getClients, updateClient  } from '../services/network';
import { fetchAppointments } from './';

export const fetchClients = createAsyncThunk('clients/get', async () => {
  const clients = await getClients();

  return clients.data;
});

export const insertClient = createAsyncThunk('clients/add', async (payload, thunkAPI) => {
  const clients = await addClient(payload);

  thunkAPI.dispatch(fetchAppointments());

  return clients.data;
});

export const editClient = createAsyncThunk('clients/edit', async (payload, thunkAPI) => {
  const clients = await updateClient(payload);

  thunkAPI.dispatch(fetchAppointments());

  return clients.data;
});

export const removeClient = createAsyncThunk('clients/delete', async (payload, thunkAPI) => {
  const clients = await deleteClient(payload);

  thunkAPI.dispatch(fetchAppointments());

  return clients.data;
});

const setLoading = (state) => {
  state.status = 'loading';
};

const setIdle = (state) => {
  state.status = 'idle';
};

const saveData = (state, action) => {
  state.data = action.payload;
  state.status = 'idle';
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.fulfilled, saveData)
      .addCase(insertClient.fulfilled, saveData)
      .addCase(editClient.fulfilled, saveData)
      .addCase(removeClient.fulfilled, setIdle)
      .addCase(fetchClients.pending, setLoading)
      .addCase(insertClient.pending, setLoading)
      .addCase(editClient.pending, setLoading)
      .addCase(removeClient.pending, setLoading)
  },
});

const reducer = clientsSlice.reducer;
const actions = { ...clientsSlice.actions };

export default {
  actions,
  reducer
};
