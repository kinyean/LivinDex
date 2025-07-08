import React from "react";
import Logo from '../Assets/UnknownUser.jpg';
import Navbar from "../Components/Navbar"; 
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "./Profile/GetProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../index";
import ProfileNavbar from "../Components/ProfileNavbar";
import '../Styles/Profile.css';

const Profile: React.FC = () => {

  const navigate = useNavigate();

  const { userId: paramId } = useParams(); 
  const [userId, setUserId] = useState<string | null>(paramId || null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    like: 0,
    follower: 0,
    subscriber: 0
  });

  useEffect(() => {
    if (paramId) {
      setUserId(paramId);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          navigate("/login");
        }
      });
      return () => unsubscribe();
    }
  }, [paramId, navigate]);

  // Fetch user profile
  useEffect(() => {
    if (!userId) return;
  
    getUserProfileApi(userId)
      .then((data) => {
        setUserData(data);
      })
      .catch((e) => {
        console.error("Failed to fetch user data:", e);
      });
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-header">
          <img className="profile-avatar" src={Logo} alt="Avatar" />
          <div className="profile-info">
          <div className="name-edit-container">
            <h1 className="profile-name">{userData.firstName + " " + userData.lastName}</h1>
            {userId === auth.currentUser?.uid && (
              <span className="edit-profile-btn" onClick={() => navigate("/editProfile")}>
                Edit Profile
              </span>
            )}
          </div>
            <p className="profile-id">LivinDex Account：{userId}</p>
            <p className="profile-bio">Intro:</p>
            <p className="profile-bio">
              {userData.bio}</p>
            <div className="profile-stats">
              <span className="profile-bio">{userData.like} Likes</span>
              <span className="profile-bio">{userData.follower} Follower</span>
              <span className="profile-bio">{userData.subscriber} Subscribers</span>
            </div>
          </div>
        </div>
        <ProfileNavbar />
      </div>
    </>
  );
};

export default Profile;