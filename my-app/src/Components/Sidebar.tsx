import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar: React.FC = () => {

  const navigate = useNavigate();

  return (
  <div className="contentSidebar">
    <div className="top-section">
    <h2 className="logo">LivinDex</h2>
    <button className="upload-btn">+ Upload</button>

    <div className="section">
      <h4>Manage</h4>
      <ul>
        <li>Home</li>
        <li>Posts</li>
        <li>Analytics</li>
        <li>Comments</li>
      </ul>
    </div>

    <div className="section">
      <h4>Others</h4>
      <ul>
        <li>Feedback</li>
      </ul>
    </div>
  </div>

  <div className="bottom-section" onClick={() => navigate("/")}>
    &lt; Back to LivinDex
  </div>
</div>
  );
};

export default Sidebar;