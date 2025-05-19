import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar"; 
import Comments from "../../Components/Comment/Comments";
import "../../Styles/Content.css";

const CreateComment: React.FC = () => {
  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
        <Comments currentUserId="1" />

        </div>
      </main>
    </div>
  );
};

export default CreateComment;