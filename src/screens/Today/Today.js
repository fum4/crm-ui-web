import {useEffect, useState} from 'react';
import {getAppointments} from '../../services/network';
import {AppointmentList, SearchEnAdd} from '../../components';
import { useHistory } from 'react-router-dom';

const Clients = ({ isAuthenticated }) => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();

  const refreshAppointments = () => {
    getAppointments().then((response) => {
      if (response.data.length) {
        setAllAppointments(response.data);
      }
    });
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    setAppointments(filteredAppointments.length ? filteredAppointments : allAppointments);
  }, [allAppointments, filteredAppointments]);

  const handleSearch = () => {};

  return (
    <>
      <SearchEnAdd
        actionSuccessHandler={() => refreshAppointments()}
        handleSearch={(payload) => handleSearch(payload)}
        type='appointment'
      />
      <AppointmentList entries={appointments} type='primary' />
    </>
  );
}

export default Clients;
