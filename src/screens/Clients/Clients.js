import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClientList, Header } from '../../components';
import { useClients } from '../../store';

const Clients = ({ isAuthenticated }) => {
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);
  const allClients = useClients(isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    setClients(filteredClients.length ? filteredClients : allClients);
  }, [allClients, filteredClients]);

  const handleSearch = (event) => {
    const payload = event.target.value;
    const keywords = payload.split(' ');

    const filtered = allClients.filter((client) => {
      let isMatch = true;

      keywords.forEach((keyword) => {
        const name = client.name?.toLowerCase();
        const surname = client.surname?.toLowerCase();
        const searchTerm = keyword?.toLowerCase();

        let currentItemMatched = false;

        if (name.includes(searchTerm) || surname.includes(searchTerm)) {
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
        handleSearch={handleSearch}
        type='client'
      />
      <ClientList entries={clients} />
    </>
  );
};

export default Clients;
