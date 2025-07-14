import React, { useEffect, useState } from 'react';
import { getPostById, Post } from './GetPosts';
import PostsCards from './PostsCards';
import Cards from './Cards'
interface Props {
  postIds: string[];
}

const LikedPosts: React.FC<Props> = ({ postIds }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await Promise.all(postIds.map(id => getPostById(id)));
      setPosts(data.filter(Boolean)); 
    };

    load();
  }, [postIds]);

  if (posts.length === 0) {
    return <p style={{ padding: "20px" }}>No liked posts yet.</p>;
  }

  return (
    <div style={{ paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {posts.map(post => (
        <PostsCards key={post.id} post={post} width="300px" />
      ))}
    </div>
  );
  
  
};



export default LikedPosts;
