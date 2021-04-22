import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.scss';

function LoadingIndicator() {
    return (
        <div className='loading-indicator'>
            <CircularProgress />
        </div>
    );
}

export default LoadingIndicator;
