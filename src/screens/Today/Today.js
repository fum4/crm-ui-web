import { useEffect, useState } from 'react';
import { AppointmentList, SearchEnAdd } from '../../components';
import { useAllAppointments } from '../../store/selectors';

const Clients = () => {
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const allAppointments = useAllAppointments();

  const refreshAppointments = () => {
  };

  useEffect(() => {
    setAppointments(filteredAppointments.length ? filteredAppointments : allAppointments);
  }, [allAppointments, filteredAppointments]);

  const handleSearch = (payload) => {
    const keywords = payload.split(' ');

    const filtered = allAppointments.filter((item) => {
      let isMatch = false;

      if (item) {
        keywords.forEach((keyword) => {
          const name = item.name?.toLowerCase();
          const surname = item.surname?.toLowerCase();
          const treatment = item.treatment?.toLowerCase();
          const technician = item.technician?.toLowerCase();
          const appointment = item.appointment?.toLowerCase();
          const date = item.date?.toLowerCase();

          const searchTerm = keyword?.toLowerCase();
          const searchPool = [name, surname, treatment, technician, appointment, date];

          searchPool.forEach((searchItem) => {
            if (searchItem?.includes(searchTerm)) {
              isMatch = true;
            }
          })

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
