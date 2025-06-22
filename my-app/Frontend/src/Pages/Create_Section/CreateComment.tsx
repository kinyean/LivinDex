import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar"; 
import Comments from "../../Components/Comment/Comments";
import "../../Styles/Content.css";
import { auth } from "../../index";
import { useParams } from "react-router-dom";

const CreateComment: React.FC = () => {

  const { postId } = useParams();
  const uid = auth.currentUser?.uid;

  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
        <Comments currentUserId={uid ?? ""} postId={postId ?? ""} /> 
        </div>
      </main>
    </div>
  );
};

export default CreateComment;