import ClientCollapsable from './ClientCollapsable';
import './styles.scss';

const ClientList = ({ entries }) => {
  return (
    <div className='clients-container'>
      {
        entries?.map((entry) => (
          <ClientCollapsable
            entry={entry}
            key={entry._id}
          />
        ))
      }
    </div>
  );
};

export default ClientList;
