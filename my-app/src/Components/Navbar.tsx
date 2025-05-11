import AddIcon from '../Assets/Add_icon.png'; 
import Logo from '../Assets/Unknown User.jpg'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/Navbar.css';

const Navbar: React.FC = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();


  return (
    <nav className='nav-wrapper'>
      
      <ul className="sidebar" style={{ display: showSidebar ? 'flex' : 'none' }}>
        <li onClick={() => setShowSidebar(false)}>Close</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li >Wallet</li>
        <li onClick={() => navigate("/logout")}>Log Out</li>
        
      </ul>
      <ul className="navbar">
        <li className="hover-underline" onClick={() => navigate("/")}>LivinDex</li>
        <li className="create">
          <img src={AddIcon} alt="Add" className="create-icon" />
          <span className="create-label" onClick={() => navigate("/content")}>Create</span>
        </li>
        <li className="hover-underline">About</li>
        <li className="hover-underline">Notification</li>

        <img className="avatar" 
             src={Logo} 
             alt="Logo" 
             onClick={() => setShowSidebar(!showSidebar)}
             style={{ cursor: 'pointer' }}/>
      </ul>
    </nav>
  );
};

export default Navbar;