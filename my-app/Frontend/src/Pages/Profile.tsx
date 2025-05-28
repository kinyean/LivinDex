import React from "react";
import Logo from '../Assets/UnknownUser.jpg';
import Navbar from "../Components/Navbar"; 
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../Components/ProfileNavbar";
import '../Styles/Profile.css';

const Profile: React.FC = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-header">
          <img className="profile-avatar" src={Logo} alt="Avatar" />
          <div className="profile-info">
          <div className="name-edit-container">
            <h1 className="profile-name">Kemango</h1>
            <span className="edit-profile-btn" onClick={() => navigate("/editProfile")}>Edit Profile</span>
          </div>
            <p className="profile-id">LivinDex Account：@Kemango</p>
            <p className="profile-bio">Intro:</p>
            <p className="profile-bio">
            I'm Kemango. Year 1 Student doing Orbital in this summer 2025.</p>
            <div className="profile-stats">
              <span>0 Views</span>
              <span>0 Followers</span>
              <span>0 Likes</span>
            </div>
          </div>
        </div>
        <ProfileNavbar />
      </div>
    </>
  );
};

export default Profile;