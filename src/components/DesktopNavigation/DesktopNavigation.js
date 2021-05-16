import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { isDesktop } from 'utils/helpers';
import { labels } from 'utils/constants';
import './styles.scss';

export const DesktopNavigation = () => {
  const shouldDisplay = useMemo(() => isDesktop(), []);

  return shouldDisplay ? (
    <nav className='navigation-container'>
      <ul>
        <li className='navigation-item'>
          <NavLink to='/'>{ labels.TODAY }</NavLink>
        </li>
        <li className='navigation-item'>
          <NavLink to='/clients'>{ labels.CLIENTS }</NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <div/>
  );
};
