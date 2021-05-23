import { AssignmentTurnedIn } from '@material-ui/icons';
import { labels } from 'utils/constants';
import './styles.scss';

export const AppointmentsPlaceholder = () => (
  <div className='appointments-placeholder'>
    <AssignmentTurnedIn color='primary' fontSize='large' />
    <p>{labels.NO_ACTIVE_APPOINTMENTS}</p>
  </div>
);
