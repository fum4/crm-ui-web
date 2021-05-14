import { labels } from '../../constants';
import { isMobile } from 'services/utils';
import ClientCollapsable from './ClientCollapsable';
import './styles.scss';

const ClientList = ({ entries }) => {
  return (
    <div className='clients-container'>
      {
        isMobile() && <h1>{ labels.CLIENTS }</h1>
      }
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
