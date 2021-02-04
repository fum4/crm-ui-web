import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getClients = () => api.get('/clients');
export const addClient = (payload) => api.post('/client', payload);
export const updateClient = (payload) => api.put('/client', payload);
export const deleteClient = (payload) => api.delete('/client', payload);

export const getAppointments = () => api.get('/appointments');
export const addAppointment = (payload) => api.post('/appointment', payload);
export const updateAppointment = (payload) => api.put('/appointment', payload);
export const deleteAppointment = (payload) =>
  api.delete('/appointment', {data: payload});
