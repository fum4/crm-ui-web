import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cancel, Check, ErrorOutline } from '@material-ui/icons';
import { clearNotification } from '../../store';
import './styles.scss';

const Notifications = (props) => {
  const dispatch = useDispatch();
  const { message, type, show } = useSelector((state) => state.notifications);
  const iconColor = type === 'success' ? 'action' : 'error';

  useEffect(() => {
    if (message && type === 'success') {
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  }, [dispatch, message, type]);

  return (
    <div>
      {
        show && (
          <div className={`notification-banner__${type}`}>
            <div>
              {
                type === 'success' ? (
                  <Check color={iconColor} />
                ) : (
                  <ErrorOutline color={iconColor} />
                )
              }
              <p>{ message }</p>
              <Cancel
                className='notification-banner__close-button'
                color={iconColor}
                onClick={() => dispatch(clearNotification())}
              />
            </div>
          </div>
        )
      }
      <div className='main-content'>
        { props.children }
      </div>
    </div>
  );
}

export default Notifications;
