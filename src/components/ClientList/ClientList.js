import ClientCollapsable from './ClientCollapsable';
import './styles.scss';

const ClientList = ({ entries }) => {
  return (
    <div className='clients-container'>
      {
        entries?.map((entry, index) => (
          <ClientCollapsable
            entry={entry}
            index={index}
            key={entry._id}
          />
        ))
      }
    </div>
  );
};

export default ClientList;
