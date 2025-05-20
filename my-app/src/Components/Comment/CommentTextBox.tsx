import React from 'react';
import { Comment as CommentType } from "./CommentDummyDB";
import Img from '../../Assets/UnknownUser.jpg';
import "../../Styles/Comment.css";

interface CommentTextBoxProps {
  comment: CommentType;
  replies: CommentType[];
}

const CommentTextBox: React.FC<CommentTextBoxProps> = ({ comment ,replies }) => {

  return (
    <div className="comment">
      <div className="comment-image-container">
      <img src={Img} alt={comment.username + " profile"} />
      </div>
      <div className="comment-right-part">
      <div className="comment-content">
        <div className="comment-meta">
          <span className="comment-author">{comment.username}</span>
          <span className="comment-date">{comment.createdAt}</span>
        </div>
        <div className="comment-text">{comment.body}</div>
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <CommentTextBox
                comment={reply}
                key={reply.id} 
                replies={[]} />
            ))}
          </div>
        )}
      </div>
        <div className="comment-text"> </div>
      </div>
    </div>
  );
};

export default CommentTextBox;