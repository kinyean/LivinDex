import AddIcon from '../Assets/Add_icon.png'; 
import Logo from '../Assets/UnknownUser.jpg'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../index"; 
import '../Styles/Navbar.css';
import DarkMode from "./DarkMode/DarkMode";

const Navbar: React.FC = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className='nav-wrapper'>
      <div className="nav-container">
      <ul className="sidebar" style={{ display: showSidebar ? 'flex' : 'none' }}>
        <li onClick={() => setShowSidebar(false)}>Close</li>
        <li onClick={() => {
            if (currentUserId) navigate(`/profile/${currentUserId}`);
          }}>Profile</li>        
        <li onClick={() => navigate("/wallet")}>Wallet</li>
        <li onClick={() => navigate("/logout")}>Log Out</li>
        
      </ul>
      <ul className="navbar">
        <li className="hover-underline" onClick={() => navigate("/")}>LivinDex</li>
        <li className="create">
          <img src={AddIcon} alt="Add" className="create-icon" onClick={() => navigate("/content")}/>
          <span className="create-label" onClick={() => navigate("/content")}>Create</span>
        </li>
        <li className="hover-underline">About</li>
        <li className="hover-underline">Notification</li>
        <DarkMode />
        <img className="avatar" 
             src={Logo} 
             alt="Logo" 
             onClick={() => setShowSidebar(!showSidebar)}
             style={{ cursor: 'pointer' }}/>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;