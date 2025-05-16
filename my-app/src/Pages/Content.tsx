import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar"; 
import "../Styles/Content.css";

const Content: React.FC = () => {
  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
          <h1>Create Content</h1>
          <p>This is where users upload their content.</p>
        </div>
      </main>
    </div>
  );
};

export default Content;