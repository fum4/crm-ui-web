import axios from 'axios';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const headers = {
    'Content-Type': 'application/json'
  };

  if (user && user.accessToken) {
    headers['Authorization'] = `Bearer ${user.accessToken}`;
  }

  return headers;
};

const baseURL = process.env.NODE_ENV === 'production' ? 'https://e-programare-api.herokuapp.com/' : 'http://localhost:3000';

const api = axios.create({
  baseURL,
  headers: getHeaders()
});

// AUTH
export const register = (payload) => api.post('/register', payload);

export const login = (payload) => {
  return api.post('/login', payload).then((response) => {
    const data = response.data;

    if (data.accessToken) {
      data.password = payload.password;
      localStorage.setItem('user', JSON.stringify(data));
    }
  });
};

export const logout = () => localStorage.removeItem('user');

// CLIENTS
export const getClients = () => api.get('/clients');

export const addClient = (payload) => api.post('/client', payload);

export const updateClient = (payload) => api.put('/client', payload);

export const deleteClient = (payload) => api.delete(`/client/${payload._id}`);

// APPOINTMENTS
export const getAppointments = () => api.get('/appointments');

export const addAppointment = (payload) => {
  const url = `/appointment/${payload.client || ''}`;

  delete payload.client;

  return api.post(url, payload);
};

export const updateAppointment = (payload) => {
  const url = `/appointment/${payload._id}`;

  delete payload.client;
  delete payload._id;

  return api.put(url, payload);
};

export const deleteAppointment = (payload) => api.delete(`/appointment/${payload._id}`);

// CONTROLS
export const updateControl = (payload) => {
  const url = `/control/${payload._id}`;

  delete payload.client;
  delete payload.name;
  delete payload.surname;
  delete payload.phone;
  delete payload.address;
  delete payload.appointmentId;
  delete payload._id;

  return api.put(url, payload);
};

export const deleteControl = (payload) => api.delete(`/control/${payload._id}`);
