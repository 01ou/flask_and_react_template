import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { AuthSwitchLink } from './_index';

const Header = () => {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 fixed top-0 w-full z-10">
      <ul className="flex justify-between items-center px-2">
        <li className="flex items-center">
          <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
          <Link to="/">Home</Link>
        </li>
        <li>
          <AuthSwitchLink />
        </li>
      </ul>
    </div>
  );
};

export default Header;
