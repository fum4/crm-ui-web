import { useEffect, useState } from 'react';
import { ClientList, SearchEnAdd } from '../../components';
import { useAllClients } from '../../store/selectors';

const Clients = () => {
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);
  const allClients = useAllClients();

  const refreshClients = () => {
  };

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
    <>
      <SearchEnAdd
        actionSuccessHandler={() => refreshClients()}
        handleSearch={(payload) => handleSearch(payload)}
        type='client'
      />
      <ClientList entries={clients} onUpdate={() => refreshClients()} />
    </>
  );
};

export default Clients;
