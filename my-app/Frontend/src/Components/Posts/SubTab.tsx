import Logo from '../../Assets/UnknownUser.jpg'
import React, { useEffect, useState } from 'react';
import { getUserProfile as getUserProfileApi} from "../../Pages/Profile/GetProfile";
import { getSubs as getSubsApi,
         subscribe as subscribeApi,
         unsubscribe as unsubscribeApi} from "../../Components/Posts/GetSubs";
import { useNavigate } from "react-router-dom";
import '../../Styles/SubTab.css';
import BaseAPI from "../../API/BaseAPI";
import { SubTabProps } from '../../Types/SubTab';


const SubscriberTab: React.FC<SubTabProps> = ({ postId, postUserId, currentUserId, onDeleteSuccess, isEditing, onToggleEdit, likes, dislikes, likedUsers, dislikedUsers }) => {
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

  const fetchPostData = async () => {
    try {
      const res = await BaseAPI.get(`/posts/${postId}`);
      setLikeCount(Number(res.data.likes) || 0);
      setDislikeCount(Number(res.data.dislikes) || 0);
    } catch (err) {
      console.error("Failed to fetch post data", err);
    }
  };

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

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Failed to copy link.");
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

        await BaseAPI.post("/subscription/removeLike", { postId, userId: currentUserId });
        setLikeCount((prev) => prev - 1);
        setUserLiked(false);
      } else {

        await BaseAPI.post("/subscription/like", { postId, userId: currentUserId });
        setLikeCount((prev) => prev + 1);
        setUserLiked(true);
  
        if (userDisliked) {
          await BaseAPI.post("/subscription/removeDislike", { postId, userId: currentUserId });
          setDislikeCount((prev) => prev - 1);
          setUserDisliked(false);
        }
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
        await BaseAPI.post("/subscription/removeDislike", { postId, userId: currentUserId });
        setDislikeCount((prev) => prev - 1);
        setUserDisliked(false);
      } else {
        // Add dislike
        await BaseAPI.post("/subscription/addDislike", { postId, userId: currentUserId });
        setDislikeCount((prev) => prev + 1);
        setUserDisliked(true);
  
        if (userLiked) {
          await BaseAPI.post("/subscription/removeLike", { postId, userId: currentUserId });
          setLikeCount((prev) => prev - 1);
          setUserLiked(false);
        }
      }
    } catch (err) {
      console.error("Dislike action failed:", err);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
  }, [postId]);
  
  useEffect(() => {
    const fetchUserLikeStatus = async () => {
      if (!postId || !currentUserId) return;
  
      try {
        const res = await BaseAPI.get(`/subscription/likes/${postId}/${currentUserId}`);
        setUserLiked(res.data.liked); 
  
        
        const res2 = await BaseAPI.get(`/subscription/dislikes/${postId}/${currentUserId}`);
        setUserDisliked(res2.data.disliked);
  
      } catch (err) {
        console.error("Failed to fetch like/dislike status", err);
      }
    };
  
    fetchUserLikeStatus();
  }, [postId, currentUserId]);
  
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
              onClick={() => navigate(`/creator/${postUserId}`)}
              style={{ cursor: 'pointer' }}/>
        <div className='sub_info'>
          <div className='profile_name_row'>
            <h1 
                className="UserProfile_name"
                onClick={() => navigate(`/creator/${postUserId}`)}
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
          <button className="share_button" onClick={handleShareClick}>Share</button>
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