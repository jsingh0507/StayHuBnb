import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../../store/modals';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { login } from '../../store/session';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    const demoUser={email: 'demo@user.io', password: 'password' };
    dispatch(login(demoUser));
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
        <div className="dropdown">
          <button className="dropbtn">
            <GiHamburgerMenu size={20}/>
            <FaUserCircle size={30} />
          </button>
          <div className="dropdown-content">
            {/* <NavLink to="/signup">Sign Up</NavLink> */}
            {/* <NavLink to="/login">Log In</NavLink> */}
            <button id="act-btn" onClick={() => dispatch(showModal('signup'))}>Sign Up</button>
            <button id="act-btn" onClick={() => dispatch(showModal('login'))}>Log In</button>
            <button id="act-btn" onClick={handleDemoLogin}>Demo Login</button>
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
