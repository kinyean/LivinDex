import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getPostById, Post } from "../Components/Posts/GetPosts";
import Navbar from "../Components/Navbar";
import Comments from "../Components/Comment/Comments";
import SubscriberTab from "../Components/Posts/SubTab";
import ImageSlider from "../Components/Posts/ImageSlider";
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

  const displayContent = () => {
    try {
      if (!post) return;

      if (mediaType === "video") {
        return (
          <div className="flex justify-center items-center w-full max-w-2xl mx-auto my-6">
            <video
              controls
              className="w-full h-auto rounded-lg shadow-md border border-gray-200"
            >
              <source src={post?.media?.[0]?.mediaURL ?? ""} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

      if (mediaType === "image") {
        const imageURLs: string[] = post.media.map((item) => item.mediaURL);

        return (
          <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Image Slider
            </h1>
            <ImageSlider images={imageURLs} />
          </div>
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

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
            {displayContent()}  
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
              likes={post.like ?? 0}
              dislikes={post.dislike ?? 0}    
              likedUsers={post.likedUsers ?? []}
              dislikedUsers={post.dislikedUsers ?? []}
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