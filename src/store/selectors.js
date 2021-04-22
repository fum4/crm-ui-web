import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, fetchAppointments } from './';

export const useAllClients = (isAuthenticated) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clients);

  useEffect(() => {
    if (isAuthenticated && !data?.length) {
      dispatch(fetchClients());
    }
  }, [data, isAuthenticated, dispatch])

  return data;
}

export const useAllAppointments = (isAuthenticated) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (isAuthenticated && !data?.length) {
      dispatch(fetchAppointments());
    }
  }, [data, isAuthenticated, dispatch])

  return data;
}
