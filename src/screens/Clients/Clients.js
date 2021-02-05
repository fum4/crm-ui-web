import {Fragment, useEffect, useState} from 'react';
import {ClientList, SearchEnAdd} from '../../components';
import {getClients} from '../../services/network';

const Clients = () => {
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
    refreshClients();
  }, []);

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

  return (
    <Fragment>
      <SearchEnAdd
        actionSuccessHandler={() => refreshClients()}
        handleSearch={(payload) => handleSearch(payload)}
        type='client'
      />
      <ClientList entries={clients} refreshClients={() => refreshClients()} />
    </Fragment>
  );
};

export default Clients;
