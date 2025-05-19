import React from 'react';
import { Comment as CommentType } from "./CommentDummyDB";
import Img from '../../Assets/UnknownUser.jpg';
import "../../Styles/Comment.css";

interface CommentTextBoxProps {
  comment: CommentType;
}

const Comment: React.FC<CommentTextBoxProps> = ({ comment }) => {

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={Img} />
      </div>
      <div className="comment-right-part">
      <div className="comment-content">
        <div className="comment-meta">
          <span className="comment-author">{comment.username}</span>
          <span className="comment-date">{comment.createdAt}</span>
        </div>
        <div className="comment-text">{comment.body}</div>
      </div>
        <div className="comment-text"> {}</div>
      </div>
    </div>
  );
};

export default Comment;