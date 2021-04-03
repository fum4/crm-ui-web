import { useEffect, useState } from 'react';
import { getAppointments } from '../../services/network';
import { AppointmentList, SearchEnAdd } from '../../components';

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

  const handleSearch = (payload) => {
    const keywords = payload.split(' ');

    const filtered = allAppointments.filter((item) => {
      let isMatch = true;

      if (item) {
        keywords.forEach((keyword) => {
          const name = item.name?.toLowerCase();
          const surname = item.surname?.toLowerCase();
          const treatment = item.treatment?.toLowerCase();
          const technician = item.technician?.toLowerCase();
          const appointment = item.appointment?.toLowerCase();
          const price = item.price?.toLowerCase();
          const date = item.date?.toLowerCase();

          const searchPool = [name, surname, treatment, technician, appointment, date, price];
          const searchTerm = keyword?.toLowerCase();

          let currentItemMatched = false;

          searchPool.forEach((searchItem) => {
            if (searchItem?.includes(searchTerm)) {
              currentItemMatched = true;
            }
          })

          if (!currentItemMatched) {
            isMatch = false;
          }
        });
      }

      return isMatch;
    });

    setFilteredAppointments(filtered);
  };

  return (
    <>
      <SearchEnAdd
        actionSuccessHandler={() => refreshAppointments()}
        handleSearch={(payload) => handleSearch(payload)}
        type='appointment'
      />
      <AppointmentList entries={appointments} onUpdate={() => refreshAppointments()} type='primary' />
    </>
  );
}

export default Clients;
