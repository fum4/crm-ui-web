import { useSelector, useDispatch } from 'react-redux';
import { Cancel, Check, ErrorOutline } from '@material-ui/icons';
import { notificationsSlice } from '../../store';
import './styles.scss';

const Notifications = (props) => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notifications);
  const clearAction = notificationsSlice.actions.clear({});
  const iconColor = type === 'success' ? 'action' : 'error';

  return (
    <div>
      {
        message && type && (
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
                onClick={() => dispatch(clearAction)}
              />
            </div>
          </div>
        )
      }
      <div className='main-content'>{ props.children }</div>
    </div>
  )
}

export default Notifications;
