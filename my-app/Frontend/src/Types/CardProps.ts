import { Post } from '../Components/Posts/GetPosts'; 

export interface CardProps {
    post: Post;
    image: string;
    alt: string;
    title: string;
    description: string;
    width?: string | number | { [key: string]: string | number };
  }
  