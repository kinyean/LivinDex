import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getPostById, Post } from "../Components/Posts/GetPosts";
import Navbar from "../Components/Navbar";
import Comments from "../Components/Comment/Comments";
import SubscriberTab from "../Components/Posts/SubTab";
import { auth } from "../index";
import "../Styles/Display.css";

const Display: React.FC = () => {

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
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
        console.log("Fetched post data:", data);
        setPost(data);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [postId]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="note-wrapper">
      <Navbar />

      <div className="note-scroller">
        <div className="image-section">
          <div className="image-wrapper">
            <img
                src={post.media?.[0]?.mediaURL}
                alt={post.header}
                className="bounded-image"
              />          
            </div>
        </div>

        <div className="note-content">
          <h3 className="title">{post.header}</h3>
          <div className="actions"> 
            <SubscriberTab 
              postId={postId ?? ""} 
              postUserId={post.userId} 
              currentUserId={uid ?? ""} 
              onDeleteSuccess={() => navigate("/")} 
            />
          </div>
          <p className="desc">{post.text}</p>

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