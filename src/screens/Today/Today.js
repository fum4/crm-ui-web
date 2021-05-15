import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {AppointmentList, Header, LoadingIndicator} from '../../components';
import { useAppointments } from '../../store';
import { labels } from '../../constants';
import moment from 'moment';
import {useSelector} from "react-redux";

const Today = () => {
  const isAuthenticated = useSelector((state) => state.general.isAuthenticated);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const allAppointments = useAppointments(isAuthenticated);
  const isLoading = useSelector((state) => state.appointments.status === 'loading');
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    setAppointments(isFiltering ? filteredAppointments : allAppointments);
  }, [allAppointments, isFiltering, filteredAppointments]);

  const handleSearch = (payload) => {
    if (payload) {
      const keywords = payload.split(' ');

      const filtered = allAppointments.filter((item) => {
        let isMatch = true;

        if (item) {
          const name = item.name?.toLowerCase();
          const surname = item.surname?.toLowerCase();
          const treatment = item.treatment?.toLowerCase();
          const technician = item.technician?.toLowerCase();
          const price = item.price?.toLowerCase();
          const date = item.type === 'appointment' && item.appointment?.toLowerCase() || item.date?.toLowerCase();
          const time = date.slice(date.indexOf('t') + 1);
          const day = (+date.slice(8, 10)).toString();
          const dayNameEn = moment(date).format('dddd').toUpperCase();
          const dayNameRo = labels.DAYS[`${dayNameEn}_NO_SPECIAL_CHARS`];
          const monthNumber = date.slice(5, 7);
          const monthNameEn = moment(monthNumber, 'MM').format('MMMM').toUpperCase();
          const monthNameRo = labels.MONTHS[monthNameEn];
          let searchByDate = false

          keywords.forEach((keyword) => {
            const searchTerm = keyword?.toLowerCase();
            const searchPool = searchByDate
              ? [monthNameRo, day, dayNameRo]
              : [monthNameRo, name, surname, treatment, technician, price, time, day, dayNameRo];

            let currentItemMatched = false;

            searchPool.forEach((searchItem) => {
              if (searchItem?.includes(searchTerm)) {
                if (searchItem === monthNameRo) {
                  searchByDate = true;
                }

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

      setIsFiltering(true);
      setFilteredAppointments(filtered);
    } else {
      setIsFiltering(false);
    }
  };

  return isAuthenticated && (
    <>
      <Header
        onSearch={handleSearch}
        type='appointment'
      />
      {
        isLoading ? <LoadingIndicator /> : <AppointmentList entries={appointments} type='primary'/>
      }
    </>
  );
}

export default Today;
