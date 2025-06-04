import React from "react";
import Logo from '../Assets/UnknownUser.jpg';
import Navbar from "../Components/Navbar"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "./Profile/GetProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../index";
import ProfileNavbar from "../Components/ProfileNavbar";
import '../Styles/Profile.css';

const Profile: React.FC = () => {

  const uid = auth.currentUser?.uid;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user is logged in");
        return;
      }
  
      const uid = user.uid;
      getUserProfileApi(uid).then((data) => {
        setUserData(data);
      }).catch((e) => {
        console.error("Failed to fetch user data:", e);
      });
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-header">
          <img className="profile-avatar" src={Logo} alt="Avatar" />
          <div className="profile-info">
          <div className="name-edit-container">
            <h1 className="profile-name">{userData.firstName + " " + userData.lastName}</h1>
            <span className="edit-profile-btn" onClick={() => navigate("/editProfile")}>Edit Profile</span>
          </div>
            <p className="profile-id">LivinDex Account：{uid}</p>
            <p className="profile-bio">Intro:</p>
            <p className="profile-bio">
              {userData.bio}</p>
            <div className="profile-stats">
              {/* TODO: not Link to backend and Firebase */}
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