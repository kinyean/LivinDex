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

  // Filters only the replies of a specific parent comment
  const getReplies = (commentId: string) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    };

  // 
  const addComment = (text: string, parentId : string | null) => {
    console.log("addComment", text, parentId);
  };

  
  useEffect(() => {
    // TODO: Pass in POST ID into the BackEnd
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
      {/* TODO: configure proper parentId  */}
      <CommentForm submitLabel="Write" handleSubmit={addComment} parentId={null} />
      <div className="comments-container">
        {rootComments.map((rootComment) => ( 
        <CommentTextBox 
          key = {rootComment.id} 
          comment={rootComment}
          replies={getReplies(rootComment.id)} />
        ))}
      </div>
    </div>
  );
};

export default Comments;