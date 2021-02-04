import {Link} from 'react-router-dom';
import './styles.scss';

const Navigation = () => {
  return (
    <nav className='navigation-container'>
      <ul>
        <li className='navigation-item'>
          <Link to='/'>Astăzi</Link>
        </li>
        <li className='navigation-item'>
          <Link to='/clients'>Pacienți</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
