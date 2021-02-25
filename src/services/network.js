import axios from 'axios';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const headers = {
    'Content-Type': 'application/json'
  }

  if (user && user.accessToken) {
    headers['Authorization'] = `Bearer ${user.accessToken}`;
  }

  return headers;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: getHeaders()
});

export const register = (payload) => axios.post('/register', payload);

export const login = (payload) => {
  return axios.post('/login', payload).then((response) => {
    const data = response.data;

    if (data.accessToken) {
      data.password = payload.password;
      localStorage.setItem('user', JSON.stringify(data));
    }
  });
}

export const logout = () => localStorage.removeItem('user');

export const getClients = () => api.get('/clients');

export const addClient = (payload) => api.post('/client', payload);

export const updateClient = (payload) => api.put('/client', payload);

export const deleteClient = (payload) => api.delete('/client', payload);

export const getAppointments = () => api.get('/appointments');

export const addAppointment = (payload) => {
  const url = `/appointment/${payload.client || ''}`

  delete payload.client;

  return api.post(url, payload);
}

export const updateAppointment = (payload) => {
  const url = `/appointment/${payload._id}`;

  delete payload.client;
  delete payload._id;

  return api.put(url, payload);
};

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

export const deleteAppointment = (payload) => {
  const url = `/appointment/${payload._id}`;

  delete payload._id;

  return api.delete(url, { _id: payload._id });
};

export const deleteControl = (payload) => {
  const url = `/control/${payload._id}`;

  delete payload._id;

  return api.delete(url, { _id: payload._id });
};
