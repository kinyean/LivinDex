import { useState, useEffect } from "react";
import {getComments as getCommentsApi,
        createComment as createCommentApi,
        updateComment as updateCommentApi,
        deleteComment as deleteCommentApi} from './GetComment';
import { Comment } from "./GetComment";
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
  const addComment = (text: string, parentId: string | null) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };
  
  const deleteComment = (commentId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updated = backendComments.filter((c) => c.id !== commentId);
        setBackendComments(updated);
      });
    }
  };
  
  const updateComment = (text: string, commentId: string) => {
    updateCommentApi(text, commentId).then(() => {
      const updated = backendComments.map((c) =>
        c.id === commentId ? { ...c, body: text } : c
      );
      setBackendComments(updated);
      setActiveComment(null);
    });
  };  
  
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