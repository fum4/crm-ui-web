import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ClientList, SearchEnAdd } from '../../components';
import { getClients } from '../../services/network';

const Clients = ({ isAuthenticated }) => {
  const [allClients, setAllClients] = useState();
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState();

  const refreshClients = () => {
    getClients().then((response) => {
      if (response.data.length) {
        setAllClients(response.data);
      }
    });
  };

  useEffect(() => {
    console.log('is auth', isAuthenticated)
    refreshClients();
  }, [isAuthenticated]);

  useEffect(() => {
    setClients(filteredClients.length ? filteredClients : allClients);
  }, [allClients, filteredClients]);

  const handleSearch = (payload) => {
    const keywords = payload.split(' ');

    const filtered = allClients.filter((client) => {
      let isMatch = false;

      keywords.forEach((keyword) => {
        const name = client.name?.toLowerCase();
        const surname = client.surname?.toLowerCase();
        const searchTerm = keyword?.toLowerCase();

        if (name.includes(searchTerm) || surname.includes(searchTerm)) {
          isMatch = true;
        }
      });

      return isMatch;
    });

    setFilteredClients(filtered);
  };

  return isAuthenticated ? (
    <>
      <SearchEnAdd
        actionSuccessHandler={() => refreshClients()}
        handleSearch={(payload) => handleSearch(payload)}
        type='client'
      />
      <ClientList entries={clients} refreshClients={() => refreshClients()} />
    </>
  ) : <Redirect to={{ pathname: '/login' }} />;
};

export default Clients;
