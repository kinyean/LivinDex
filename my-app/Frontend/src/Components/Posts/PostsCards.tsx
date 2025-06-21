import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Post } from './GetPosts'; 

export interface CardProps {
  post: Post;
  width?: string;
}

export default function PostsCards({ post, width = '100%' }: CardProps) {
  const image = post.media?.[0]?.mediaURL ?? "";
  const alt = post.header;
  const title = post.header;
  const description = post.text;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width }}>
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia component="img" height="140" image={image} alt={alt} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 'auto' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
