import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients, fetchAppointments } from './';

export const useAllClients = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clients);

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchClients());
    }
  }, [data, dispatch])

  return data;
}

export const useAllAppointments = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchAppointments());
    }
  }, [data, dispatch])

  return data;
}
