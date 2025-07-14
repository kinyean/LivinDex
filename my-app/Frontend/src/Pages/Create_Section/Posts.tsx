import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import MyPostCardGrid from "../../Components/Posts/MyPostCardGrid";
import Sidebar from "../../Components/Sidebar"; 
import "../../Styles/Posts.css";

const Posts: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) setUserId(uid);
  }, []);

  if (!userId) return <p>User ID not found.</p>;

  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
          <h3 className="posts_title">My Posts</h3>
          <MyPostCardGrid userId={userId} />
        </div>
      </main>
    </div>
  );
};

export default Posts;
