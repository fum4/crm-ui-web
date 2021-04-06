import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cancel, Check, ErrorOutline } from '@material-ui/icons';
import { notificationsSlice } from '../../store';
import './styles.scss';

const Notifications = (props) => {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const { message, type } = useSelector((state) => state.notifications);
  const clearAction = notificationsSlice.actions.clear({});
  const iconColor = type === 'success' ? 'action' : 'error';

  useEffect(() => {
    if (message) {
      setShowNotification(true);

      if (type === 'success') {
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  }, [message, type])

  const closeNotification = () => {
    setShowNotification(false);
    dispatch(clearAction);
  }

  return (
    <div>
      {
        showNotification && (
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
                onClick={() => closeNotification()}
              />
            </div>
          </div>
        )
      }
      <div className={`main-content${showNotification ? '__show-notification' : ''}`}>
        { props.children }
      </div>
    </div>
  );
}

export default Notifications;
