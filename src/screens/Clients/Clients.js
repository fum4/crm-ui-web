import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClientList, Header, LoadingIndicator } from 'components';
import { useClients } from 'store';
import { useSelector } from 'react-redux';

const Clients = () => {
  const isAuthenticated = useSelector((state) => state.general.isAuthenticated);
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);
  const allClients = useClients(isAuthenticated);
  const isLoading = useSelector((state) => state.clients.status === 'loading');
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    setClients(filteredClients.length ? filteredClients : allClients);
  }, [allClients, filteredClients]);

  const handleSearch = (payload) => {
    const keywords = payload.split(' ');

    const filtered = allClients.filter((client) => {
      let isMatch = true;

      keywords.forEach((keyword) => {
        const name = client.name?.toLowerCase();
        const surname = client.surname?.toLowerCase();
        const phone = client.phone?.toLowerCase();
        const searchPool = [name, surname, phone];
        const searchTerm = keyword?.toLowerCase();

        let currentItemMatched = false;

        if (searchPool.includes(searchTerm)) {
          currentItemMatched = true;
        }

        if (!currentItemMatched) {
          isMatch = false;
        }
      });

      return isMatch;
    });

    setFilteredClients(filtered);
  };

  return isAuthenticated && (
    <>
      <Header
        onSearch={handleSearch}
        type='client'
      />
      {
        isLoading ? <LoadingIndicator /> : <ClientList entries={clients}/>
      }
    </>
  );
};

export default Clients;
