import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addClient, deleteClient, getClients, updateClient  } from '../services/network';

export const fetchClients = createAsyncThunk('clients/get', async () => {
  const clients = await getClients();

  return clients.data;
});

export const insertClient = createAsyncThunk('clients/add', async (payload) => {
  const clients = await addClient(payload);

  return clients.data;
});

export const editClient = createAsyncThunk('clients/edit', async (payload) => {
  const clients = await updateClient(payload);

  return clients.data;
});

export const removeClient = createAsyncThunk('clients/delete', async (payload) => {
  const clients = await deleteClient(payload);

  return clients.data;
});

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(insertClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(insertClient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(editClient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(removeClient.pending, (state) => {
        state.status = 'loading';
      })
  },
});

const reducer = clientsSlice.reducer;
const actions = { ...clientsSlice.actions };

export default {
  actions,
  reducer
};
