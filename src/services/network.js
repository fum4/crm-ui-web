import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authenticate = (payload) => api.post('/auth', payload);

export const getClients = () => api.get('/clients');
export const addClient = (payload) => api.post('/client', payload);
export const updateClient = (payload) => api.put('/client', payload);
export const deleteClient = (payload) => api.delete('/client', payload);

export const getAppointments = () => api.get('/appointments');
export const addAppointment = (payload) => api.post('/appointment', payload);
export const updateAppointment = (payload) => {
  console.log('##### should have _id set', payload);
  const url = `/appointment/${payload._id}`;

  delete payload.client;
  delete payload._id;

  return api.put(url, payload);
};
export const deleteAppointment = (payload) => {
  const url = `/appointment/${payload.date}`;

  delete payload.date;

  return api.delete(url, { data: payload });
};
