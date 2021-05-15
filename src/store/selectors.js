import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, fetchAppointments } from './';

export const useClients = (isAuthenticated) => {
  const dispatch = useDispatch();
  const [ clientsFetched, setClientsFetched ] = useState(false);
  const { data } = useSelector((state) => state.clients);

  useEffect(() => {
    if (isAuthenticated && !clientsFetched) {
      dispatch(fetchClients());
      setClientsFetched(true);
    }
  }, [isAuthenticated, dispatch, clientsFetched])

  return data;
}

export const useAppointments = (isAuthenticated) => {
  const dispatch = useDispatch();
  const [ appointmentsFetched, setAppointmentsFetched ] = useState(false);
  const { data } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (isAuthenticated && !appointmentsFetched) {
      dispatch(fetchAppointments());
      setAppointmentsFetched(true);
    }
  }, [isAuthenticated, dispatch, appointmentsFetched])

  return data;
}
