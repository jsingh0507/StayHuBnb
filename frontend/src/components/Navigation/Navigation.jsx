import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../../store/modals';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaUserCircle } from 'react-icons/fa';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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
            {/* <NavLink to="/signup">Sign Up</NavLink> */}
            {/* <NavLink to="/login">Log In</NavLink> */}
            <button onClick={() => dispatch(showModal('signup'))}>Sign Up</button>
            <button onClick={() => dispatch(showModal('login'))}>Log In</button>
          </div>
        </div>
      );
  }

  return (
    <nav className="navigation-bar">
        <div className="logo">
            {/* <NavLink to="/"><FaHome size={30} /></NavLink> */}
            <NavLink to="/">
              <img
                id="bnb-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" 
                alt="Airbnb Logo"
              />
            </NavLink>
        </div>

        <div className="nav-links">
            {sessionLinks}
        </div>
    </nav>
     
  );
}

export default Navigation;
