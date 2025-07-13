import React from "react";
import SlideCards from "../../../SlideCards"; 
import { Post } from "../../../Posts/GetPosts";

interface CreatorHomePostsProps {
  posts: Post[];
}

const CreatorHomePosts: React.FC<CreatorHomePostsProps> = ({ posts }) => {
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <>
      <h1 className="profile_subTitle">Posts</h1>
      <SlideCards slides={recentPosts} />
    </>
  );
};

export default CreatorHomePosts;
