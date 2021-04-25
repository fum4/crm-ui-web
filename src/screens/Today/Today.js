import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppointmentList, SearchEnAdd } from '../../components';
import { useAllAppointments } from '../../store';
import { labels } from '../../constants';
import moment from 'moment';

const Today = ({ isAuthenticated }) => {
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const allAppointments = useAllAppointments(isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    setAppointments(filteredAppointments.length ? filteredAppointments : allAppointments);
  }, [allAppointments, filteredAppointments]);

  const handleSearch = (payload) => {
    const keywords = payload.split(' ');

    const filtered = allAppointments.filter((item) => {
      let isMatch = true;

      if (item) {
        const name = item.name?.toLowerCase();
        const surname = item.surname?.toLowerCase();
        const treatment = item.treatment?.toLowerCase();
        const technician = item.technician?.toLowerCase();
        const appointment = item.appointment?.toLowerCase();
        const price = item.price?.toLowerCase();
        const date = item.appointment?.toLowerCase() || item.date?.toLowerCase();
        const time = date.slice(date.indexOf('t') + 1);
        const day = (+date.slice(8, 10)).toString();
        const monthNumber = date.slice(5, 7);
        const monthNameEn = moment(monthNumber, 'MM').format('MMMM').toUpperCase();
        const monthNameRo = labels.MONTHS[monthNameEn];

        keywords.forEach((keyword) => {
          const searchPool = [name, surname, treatment, technician, appointment, price, time, day, monthNameRo];
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

  return isAuthenticated && (
    <>
      <SearchEnAdd
        handleSearch={(payload) => handleSearch(payload)}
        type='appointment'
      />
      <AppointmentList entries={appointments} type='primary' />
    </>
  );
}

export default Today;
