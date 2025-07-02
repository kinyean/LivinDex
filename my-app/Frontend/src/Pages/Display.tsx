import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, Post } from "../Components/Posts/GetPosts";
import Navbar from "../Components/Navbar";
import Comments from "../Components/Comment/Comments";
import { auth } from "../index";
import "../Styles/Display.css";
import BaseAPI from "../API/BaseAPI";

const Display: React.FC = () => {

  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();

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

  const handleDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this post?");
  if (!confirmed || !postId) return;

  try {
    await BaseAPI.delete(`/posts/${postId}`);
    alert("Post deleted!");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Failed to delete post.");
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
            <img
                src={post.media?.[0]?.mediaURL}
                alt={post.header}
                className="bounded-image"
              />          
            </div>
        </div>

        <div className="note-content">
          <h3 className="title">{post.header}</h3>
          <p className="desc">{post.text}</p>

          <div className="hashTagxsxw">
            {post.tags?.map((tag) => `#${tag} `)}
          </div>

          <div className="event">
            <p>📅 {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="actions">
            <span>❤️ 59</span>
            <span>⭐ 69</span>
            <span>💬 4</span>
            <span>🔗</span>
          </div>
        </div>

        <div className="note-footer">
          <Comments currentUserId={uid ?? ""} postId={postId ?? ""} />
        </div>
        
        {uid === post.userId && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={handleDelete} className="delete-button">
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;