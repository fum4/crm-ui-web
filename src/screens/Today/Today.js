import { useEffect, useState } from 'react';
import { AppointmentList, SearchEnAdd } from '../../components';
import { useAllAppointments } from '../../store';

const Clients = () => {
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const allAppointments = useAllAppointments();

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
        handleSearch={(payload) => handleSearch(payload)}
        type='appointment'
      />
      <AppointmentList entries={appointments} type='primary' />
    </>
  );
}

export default Clients;
