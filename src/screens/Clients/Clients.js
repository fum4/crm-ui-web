import { useEffect, useState } from 'react';
import { ClientList, SearchEnAdd } from '../../components';
import { useAllClients } from '../../store/selectors';

const Clients = () => {
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);
  const allClients = useAllClients();

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

  return (
    <>
      <SearchEnAdd
        handleSearch={(payload) => handleSearch(payload)}
        type='client'
      />
      <ClientList entries={clients} />
    </>
  );
};

export default Clients;
