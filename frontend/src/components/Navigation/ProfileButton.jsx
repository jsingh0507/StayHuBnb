import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <div className="profile-button">
      <button className="prof-button" onClick={toggleMenu}>
        <GiHamburgerMenu size={20}/>
        <FaUserCircle size={30} />
      </button>
      {showMenu && (
        <div className="profile-dropdown" ref={dropdownRef}>
          <p>{user.fullName}</p>
          <p>{user.email}</p>
          <button onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;