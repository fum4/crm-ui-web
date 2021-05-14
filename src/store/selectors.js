import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, fetchAppointments } from './';

export const useClients = (isAuthenticated) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clients);

  useEffect(() => {
    if (isAuthenticated && !data?.length) {
      dispatch(fetchClients());
    }
  }, [isAuthenticated, dispatch])

  return data;
}

export const useAppointments = (isAuthenticated) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (isAuthenticated && !data?.length) {
      dispatch(fetchAppointments());
    }
  }, [isAuthenticated, dispatch])

  return data;
}
