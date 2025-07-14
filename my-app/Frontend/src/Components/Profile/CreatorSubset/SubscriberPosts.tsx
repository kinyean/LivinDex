import React, { useEffect, useState } from 'react';
import { Post, getAllPosts } from '../../Posts/GetPosts';
import PostCardGrid from "../../../Components/Posts/PostCardGrid";

interface SubscribersPostProps {
  userIds: string[];
}

const SubscribersPost: React.FC<SubscribersPostProps> = ({ userIds }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      const filtered = allPosts
        .filter((post: Post) => userIds.includes(post.userId))
        .sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPosts(filtered);
    };
    fetchPosts();
  }, [userIds]);

  if (posts.length === 0) {
    return <p style={{ padding: "20px" }}>No new posts from your subscriptions yet.</p>;
  }

  return <PostCardGrid userPosts={posts} />;
};

export default SubscribersPost;
