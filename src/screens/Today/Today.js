import {Fragment, useEffect, useState} from 'react';
import {getAppointments} from '../../services/network';
import {AppointmentList, SearchEnAdd} from '../../components';

const Clients = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);

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
    setAppointments(filteredAppointments.length ? filteredAppointments : allAppointments);
  }, [allAppointments, filteredAppointments]);

  const handleSearch = () => {};

  return (
    <Fragment>
      <SearchEnAdd
        actionSuccessHandler={() => refreshAppointments()}
        handleSearch={(payload) => handleSearch(payload)}
        type='appointment'
      />
      <AppointmentList entries={appointments} type='primary' />
    </Fragment>
  );
};

export default Clients;