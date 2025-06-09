import React from 'react';
import { Comment as CommentType } from "./GetComment";
import Img from '../../Assets/UnknownUser.jpg';
import "../../Styles/Comment.css";
import CommentForm from './CommentForm';

type ActiveComment = {
  id: string;
  type: "editing" | "replying";
};

interface CommentTextBoxProps {
  comment: CommentType;
  replies: CommentType[];
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  activeComment: ActiveComment | null;
  setActiveComment: (activeComment: ActiveComment | null) => void;
  parentId: string | null;
  addComment: (text: string, parentId: string) => void;
  updateComment: (text: string, commentId: string) => void;
}

const CommentTextBox: React.FC<CommentTextBoxProps> = ({ comment, replies, currentUserId, deleteComment, activeComment, setActiveComment, parentId, addComment, updateComment}) => {
  
  // const fiveMinutes = 300000;
  // const timePassed = new Date().getTime() - new Date(comment.createdAt).getTime() > fiveMinutes;

  const canEdit = true; 
  const canDelete = true; 
  const canReply = true; 
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";

  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";

  // const replyId = parentId ? parentId : comment.id;

  return (
    <div className="comment">
      <div className="comment-image-container">
      <img src={Img} alt={comment.username + " profile"} />
      </div>
      <div className="comment-right-part">
      <div className="comment-content">
        <div className="comment-meta">
          <div className="comment-author">{comment.username}</div>
          <div> {createdAt} </div>
        </div>

        {!isEditing && <div className="comment-text">{comment.body}</div>}

        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id) }
            handleCancel={() => {
              setActiveComment(null);
            }}
            parentId={null}
          />
        )}

        <div className="comment-actions">
          {canReply && (
            <div 
              className="comment-action" 
              onClick={() => 
                setActiveComment({id: comment.id, type:"replying"})}
            >
              Reply 
            </div>
          )}
          {canEdit && (
            <div 
              className="comment-action" 
              onClick={() => 
                setActiveComment({id: comment.id, type:"editing"})}
            >
              Edit 
            </div>
          )}
          {canDelete && (
            <div 
              className="comment-action" 
              onClick={() => deleteComment(comment.id)}
            > 
              Delete 
            </div> 
          )}
        </div>

        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            initialText=""
            handleSubmit={(text) => addComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
            parentId={parentId}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <CommentTextBox
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
                updateComment={updateComment} 
                />
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