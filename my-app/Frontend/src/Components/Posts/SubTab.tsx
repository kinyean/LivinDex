import Logo from '../../Assets/UnknownUser.jpg'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile as getUserProfileApi} from "../../Pages/Profile/GetProfile";
import { getSubs as getSubsApi,
         subscribe as subscribeApi,
         unsubscribe as unsubscribeApi,
         likePost as likePostApi,
         dislikePost as dislikePostApi } from "../../Components/Posts/GetSubs";
import { useNavigate } from "react-router-dom";
import { auth } from "../../index";
import '../../Styles/SubTab.css';
import BaseAPI from "../../API/BaseAPI";
import { SubTabProps } from '../../Types/SubTab';


const SubscriberTab: React.FC<SubTabProps> = ({ postId, postUserId, currentUserId, onDeleteSuccess, isEditing, onToggleEdit, likes, dislikes, likedUsers, dislikedUsers }) => {
  
  const [showSidebar, setShowSidebar] = useState(false);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [userDisliked, setUserDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(dislikes || 0);
  const [posterData, setPosterData] = useState({
    firstName: "",
    lastName: "",
    subscriber: 0
  });

  const navigate = useNavigate();

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

  const handleSubscribeClick = async () => {
    try {
      if (isSubscribed) {
        await unsubscribeApi(currentUserId, postUserId);
        setIsSubscribed(false);
        setPosterData((prev) => ({
          ...prev,
          subscriber: prev.subscriber - 1,
        }));
      } else {
        await subscribeApi(currentUserId, postUserId);
        setIsSubscribed(true);
        setPosterData((prev) => ({
          ...prev,
          subscriber: prev.subscriber + 1,
        }));
      }
    } catch (err) {
      console.error("Subscription action failed:", err);
      alert("Something went wrong.");
    }
  };

  const handleLikeClick = async () => {
    try {
      if (userLiked) {
        // Undo like
        await likePostApi(postId, currentUserId);
        setLikeCount((prev) => prev - 1);
        setUserLiked(false);
      } else {
        // If previously disliked, undo it
        if (userDisliked) {
          await dislikePostApi(postId, currentUserId);
          setDislikeCount((prev) => prev - 1);
          setUserDisliked(false);
        }
  
        // Like the post
        await likePostApi(postId, currentUserId);
        setLikeCount((prev) => prev + 1);
        setUserLiked(true);
      }
    } catch (err) {
      console.error("Like action failed:", err);
      alert("Something went wrong.");
    }
  };
  
  const handleDislikeClick = async () => {
    try {
      if (userDisliked) {
        // Undo dislike
        await dislikePostApi(postId, currentUserId);
        setDislikeCount((prev) => prev - 1);
        setUserDisliked(false);
      } else {
        // If previously liked, undo it
        if (userLiked) {
          await likePostApi(postId, currentUserId);
          setLikeCount((prev) => prev - 1);
          setUserLiked(false);
        }
  
        // Dislike the post
        await dislikePostApi(postId, currentUserId);
        setUserDisliked(true);
      }
    } catch (err) {
      console.error("Dislike action failed:", err);
      setLikeCount((prev) => prev - 1);
      alert("Something went wrong.");
    }
  };
  
  useEffect(() => {
    setUserLiked(likedUsers.includes(currentUserId));
    setUserDisliked(dislikedUsers.includes(currentUserId));
  }, [likedUsers, dislikedUsers, currentUserId]);

  // Fetch poster's user info
  useEffect(() => {
    getUserProfileApi(postUserId)
      .then((data) => {
        setPosterData(data);
      })
      .catch((e) => {
        console.error("Failed to fetch poster's data:", e);
      });

    getSubsApi(currentUserId).then((subs:string[]) => {
      setIsSubscribed(subs.includes(postUserId));
    });
  }, [postUserId, currentUserId]);

  return (
    <div className='sub_wrapper'>
      <div className='sub_left'>
        <img className="sub_avatar" 
              src={Logo} 
              alt="Logo" 
              onClick={() => navigate(`/profile/${postUserId}`)}
              style={{ cursor: 'pointer' }}/>
        <div className='sub_info'>
          <div className='profile_name_row'>
            <h1 
                className="UserProfile_name"
                onClick={() => navigate(`/profile/${postUserId}`)}
                style={{ cursor: 'pointer' }}
              >
                {posterData.firstName} {posterData.lastName}     
            </h1>
            <h1 className="UserProfile_subs">
              {posterData.subscriber} subscribers
            </h1>
          </div>
        </div>
        {currentUserId !== postUserId && (
          <button className="subscribe_button" onClick={handleSubscribeClick}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>
      <div className="sub_right">
        <div className='sub_other'>
          <div className='like_dislike_group'>
            <button className={`like_button ${userLiked ? "active" : ""}`} onClick={handleLikeClick}>
              {likeCount} Like
            </button> 

            <button className={`dislike_button ${userDisliked ? "active" : ""}`} onClick={handleDislikeClick}>
              DisLike
            </button>
          </div>
          <button className="share_button">Share</button>
          {postUserId === currentUserId && (
            <button onClick={onToggleEdit} className="edit_button">
              {isEditing ? "Save" : "Edit"}
            </button>
          )}
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