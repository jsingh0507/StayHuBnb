import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../../store/modals';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { login } from '../../store/session';
import { useState, useEffect, useRef } from 'react';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

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
          <button className="dropbtn" onClick={toggleMenu}>
            <GiHamburgerMenu size={20}/>
            <FaUserCircle size={30} />
          </button>
          {showMenu && (
            <div className="dropdown-content" ref={dropdownRef}>
              {/* <NavLink to="/signup">Sign Up</NavLink> */}
              {/* <NavLink to="/login">Log In</NavLink> */}
              <button onClick={() => dispatch(showModal('signup'))}>Sign Up</button>
              <button onClick={() => dispatch(showModal('login'))}>Log In</button>
              <button onClick={handleDemoLogin}>Demo Login</button>
            </div>
          )}
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
