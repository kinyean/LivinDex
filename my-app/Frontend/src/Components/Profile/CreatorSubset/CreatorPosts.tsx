import React from "react";
import PostCardGrid from "../../../Components/Posts/PostCardGrid";
import { useParams } from "react-router-dom";

const CreatorPosts: React.FC = () => {
  const { userId } = useParams();

  if (!userId) return <p>User ID not found.</p>;

  return (
    <>
      <h1 className="profile_subTitle">All Posts</h1>
      <PostCardGrid userId={userId} />
    </>
  );
};

export default CreatorPosts;
