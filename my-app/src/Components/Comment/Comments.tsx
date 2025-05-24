import { useState, useEffect } from "react";
import {getComments as getCommentsApi,
        createComment as createCommentApi,
        updateComment as updateCommentApi,
        deleteComment as deleteCommentApi} from './CommentDummyDB';
import { Comment } from "./CommentDummyDB";
import CommentTextBox from "./CommentTextBox";
import CommentForm from './CommentForm';

type ActiveComment = {
  id: string;
  type: "editing" | "replying";
};

interface CommentsProps {
  currentUserId: string;
}

const Comments: React.FC<CommentsProps>  = ({currentUserId}) => {
  const [backendComments, setBackendComments] = useState<Comment[]>([]);

  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null);

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
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  const updateComment = (text: string, commentId: string) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
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
      <CommentForm 
        submitLabel="Write" 
        hasCancelButton={false}
        initialText=""
        handleSubmit={addComment} 
        handleCancel={() => {
          setActiveComment(null);
        }}
        parentId={null} />
      
      <div className="comments-container">
        {rootComments.map((rootComment) => ( 
        <CommentTextBox 
          key={rootComment.id}
          comment={rootComment}
          replies={getReplies(rootComment.id)}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          addComment={addComment}
          deleteComment={deleteComment}
          currentUserId={currentUserId}
          parentId={null}
          updateComment={updateComment} 
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;