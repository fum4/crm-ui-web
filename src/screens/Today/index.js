import { Fragment, useEffect, useState } from 'react';
import { getAppointments } from '../../services/network';
import { AppointmentList, SearchEnAdd } from '../../components';

const ClientsScreen = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const refreshAppointments = () => {
    getAppointments().then((response) => {
      if (response.data.length) {
        setAllAppointments(response.data);
      }
    });
  }

  useEffect(() => {
    refreshAppointments();
  }, []);

  useEffect(() => {
    setAppointments(filteredAppointments.length ? filteredAppointments : allAppointments);
  }, [allAppointments, filteredAppointments]);

  const handleSearch = () => {

  }

  return (
    <Fragment>
      <SearchEnAdd
        type='appointment'
        handleSearch={(payload) => handleSearch(payload)}
        actionSuccessHandler={() => refreshAppointments()} />
      <AppointmentList type='primary' entries={appointments} />
    </Fragment>
  )
}

export default ClientsScreen;
