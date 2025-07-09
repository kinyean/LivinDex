import React from 'react';
import '../Styles/Profile.css';

const ProfileNavbar: React.FC = () => {
  return (
    <nav className='profileNav-wrapper'>
      <ul className="profileNavbar">
        <li className="profileHover-underline active">Subscriber</li>
        <li className="profileHover-underline">Favorites</li>
        <li className="profileHover-underline">Liked</li>
      </ul>
    </nav>
  );
};

export default ProfileNavbar;