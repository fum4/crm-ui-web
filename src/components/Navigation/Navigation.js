import { Link } from 'react-router-dom';
import { signOut } from '../../services/network';
import './styles.scss';

const Navigation = ({ onSignOut }) => {
  const handleSignOut = () => {
    signOut().then(() => {
      onSignOut();
    });
  };

  return (
    <nav className='navigation-container'>
      <ul>
        <li className='navigation-item'>
          <Link to='/today'>Astăzi</Link>
        </li>
        <li className='navigation-item'>
          <Link to='/clients'>Pacienți</Link>
        </li>
        <li className='navigation-item' onClick={() => handleSignOut()}>
          Deconectează-te
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
