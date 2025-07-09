import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getPostById, Post } from "../Components/Posts/GetPosts";
import Navbar from "../Components/Navbar";
import Comments from "../Components/Comment/Comments";
import SubscriberTab from "../Components/Posts/SubTab";
import { auth } from "../index";
import "../Styles/Display.css";
import BaseAPI from "../API/BaseAPI";

const Display: React.FC = () => {

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) {
          console.log("No postId in URL");
          return;
        }
        console.log("Fetching post with ID:", postId);
        const data = await getPostById(postId);
        setEditedTitle(data.header);
        setEditedDesc(data.text);
        console.log("Fetched post data:", data);
        setPost(data);
        setMediaType(data.media?.[0]?.mediaType)
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [postId]);

  const displayThumbnail = () => {
    try {
      if (post == null) return ;
      return (
        <div>
          <img 
              src={post.thumbnailURL} 
              alt={post.header}
              className="bounded-image"
              />
        </div>
      )
    } catch (err) {
      console.error(err);
    }
    
  }

  const handleSave = async () => {
    try {
      await BaseAPI.patch(`/posts/${postId}`, {
        header: editedTitle,
        text: editedDesc,
      });
      alert("Post edited successfully");
      setPost((prev) => prev ? { ...prev, header: editedTitle, text: editedDesc } : null);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error editing post")
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="note-wrapper">
      <Navbar />

      <div className="note-scroller">
        <div className="image-section">
          <div className="image-wrapper">
            {displayThumbnail()}  
            </div>
        </div>

        <div className="note-content">
        {isEditing ? (
          <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-input title"
            /> 
          ) : (
            <h3 className="title">{post.header}</h3>
          )}
          <div className="actions"> 
            <SubscriberTab 
              postId={postId ?? ""} 
              postUserId={post.userId} 
              currentUserId={currentUserId ?? ""} 
              onDeleteSuccess={() => navigate("/")} 
              isEditing={isEditing}
              onToggleEdit={isEditing ? handleSave : () => setIsEditing(true)}
            />
          </div>
          {isEditing ? (
          <textarea
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="edit-input desc"
            />
          ) : (
            <p className="desc">{post.text}</p>
          )}
          

          <div className="hashTagxsxw">
            {post.tags?.map((tag) => `#${tag} `)}
          </div>

          <div className="event">
            <p>📅 {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="note-footer">
          <Comments currentUserId={uid ?? ""} postId={postId ?? ""} />
        </div>
      </div>
    </div>
  );
};

export default Display;