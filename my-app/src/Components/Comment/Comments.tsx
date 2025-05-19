import { useState, useEffect } from "react";
import {getComments as getCommentsApi} from './CommentDummyDB';
import { Comment } from "./CommentDummyDB";
import CommentTextBox from "./CommentTextBox";
import CommentForm from './CommentForm';

interface CommentsProps {
  currentUserId: string; 
}

const Comments: React.FC<CommentsProps>  = ({currentUserId}) => {
  const [backendComments, setBackendComments] = useState<Comment[]>([]);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  useEffect(() => {
    console.log("backendComments", backendComments);
  }, [backendComments]);
  
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      {/* <CommentForm submitLabel="Write" handleSubmit={addComment} /> */}
      <div className="comments-container">
        {rootComments.map((rootComment) => ( 
          <>
            <div key = {rootComment.id}>{rootComment.body}</div>
            <CommentTextBox key = {rootComment.id} comment={rootComment}/>
          </>
        ))}
      </div>
    </div>
  );
};

export default Comments;