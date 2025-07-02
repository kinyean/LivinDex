import Logo from '../../Assets/UnknownUser.jpg'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile as getUserProfileApi} from "../../Pages/Profile/GetProfile";
import { useNavigate } from "react-router-dom";
import { auth } from "../../index";
import '../../Styles/SubTab.css';
import BaseAPI from "../../API/BaseAPI";

interface Props {
  postId: string;
  postUserId: string;
  currentUserId: string;
  onDeleteSuccess: () => void;
}

const SubscriberTab: React.FC<Props> = ({ postId, postUserId, currentUserId, onDeleteSuccess }) => {
  
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await BaseAPI.delete(`/posts/${postId}`);
      alert("Post deleted!");
      onDeleteSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    like: 0,
    dislike: 0,
    subscriber: 0  
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
    <div className='sub_wrapper'>
      <div className='sub_left'>
        <img className="sub_avatar" 
              src={Logo} 
              alt="Logo" 
              onClick={() => setShowSidebar(!showSidebar)}
              style={{ cursor: 'pointer' }}/>
        <div className='sub_info'>
          <div className='profile_name_row'>
            <h1 className="UserProfile_name">
              {userData.firstName} {userData.lastName}
            </h1>
            <h1 className="UserProfile_subs">
              {userData.subscriber} subscribers
            </h1>
          </div>
        </div>
        <button className="subscribe_button">Subscribe</button>
      </div>
      <div className="sub_right">
        <div className='sub_other'>
          <div className='like_dislike_group'>
            <button className="like_button">Like</button> 
            <button className="dislike_button">DisLike</button>
          </div>
          <button className="share_button">Share</button>
          {currentUserId === postUserId && (
            <button onClick={handleDelete} className="delete_button">
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriberTab;