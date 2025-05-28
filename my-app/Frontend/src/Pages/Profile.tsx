import React from "react";
import Logo from '../Assets/UnknownUser.jpg';
import Navbar from "../Components/Navbar"; 
import ProfileNavbar from "../Components/ProfileNavbar";
import '../Styles/Profile.css';

const Profile: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-header">
          <img className="profile-avatar" src={Logo} alt="Avatar" />
          <div className="profile-info">
            <h1 className="profile-name">Kemango</h1>
            <p className="profile-id">LivinDex Account：@Kemango</p>
            <p className="profile-bio">Intro</p>
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