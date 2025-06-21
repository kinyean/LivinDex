import React from "react";
import Navbar from "../../Components/Navbar";
import PostCardGrid from "../../Components/Posts/PostCardGrid";
import Sidebar from "../../Components/Sidebar"; 
import "../../Styles/Posts.css";

const Posts: React.FC = () => {

  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
          <h3 className="posts_title">My Posts</h3>
          <PostCardGrid />
        </div>
      </main>
    </div>
  );
};

export default Posts;