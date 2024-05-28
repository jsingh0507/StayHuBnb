import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaHome } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
        <div className="dropdown">
          <button className="dropbtn"><FaUserCircle size={30} /></button>
          <div className="dropdown-content">
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/login">Log In</NavLink>
          </div>
        </div>
      );
  }

  return (
    <nav className="navigation-bar">
        <div className="logo">
            <NavLink to="/"><FaHome size={30} /></NavLink>
        </div>
        <div className="nav-links">
            {sessionLinks}
        </div>
    </nav>
     
  );
}

export default Navigation;
