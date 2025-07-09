import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Post } from './GetPosts'; 
import { useNavigate } from "react-router-dom";


export interface CardProps {
  post: Post;
  width?: string;
}

export default function PostsCards({ post, width = '100%' }: CardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const image = post?.thumbnailURL ?? "";
  const alt = post.header;
  const title = post.header;
  const createAt = new Date(post.createdAt).toLocaleString();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width }} onClick={handleClick}>
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia component="img" height="140" image={image} alt={alt} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 'auto' }}>
            {createAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
