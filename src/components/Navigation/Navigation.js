import {NavLink} from 'react-router-dom';
import './styles.scss';

const Navigation = () => {
  return (
    <nav className='navigation-container'>
      <ul>
        <li className='navigation-item'>
          <NavLink to='/'>Astăzi</NavLink>
        </li>
        <li className='navigation-item'>
          <NavLink to='/clients'>Pacienți</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
