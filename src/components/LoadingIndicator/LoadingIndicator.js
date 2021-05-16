import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.scss';

export const LoadingIndicator = () => (
  <div className='loading-indicator'>
    <CircularProgress />
  </div>
);
