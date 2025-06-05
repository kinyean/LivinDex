import { useState, useEffect } from "react";
import {getComments as getCommentsApi,
        createComment as createCommentApi,
        updateComment as updateCommentApi,
        deleteComment as deleteCommentApi} from './GetComment';
import { Comment } from "./GetComment";
import CommentTextBox from "./CommentTextBox";
import CommentForm from './CommentForm';
import { getUserProfile as getUserProfileApi} from "../../Pages/Profile/GetProfile";
import { auth } from "../../index";
import { onAuthStateChanged } from "firebase/auth";

type ActiveComment = {
  id: string;
  type: "editing" | "replying";
};

interface CommentsProps {
  currentUserId: string ;
}

const Comments: React.FC<CommentsProps>  = ({currentUserId}) => {
  const [backendComments, setBackendComments] = useState<Comment[]>([]);

  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

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

  // Adds a new comment or reply and updates the comment list state
  const addComment = (text: string, parentId: string | null) => {
    console.log("Creating comment with userData:", userData); 

    createCommentApi(text, parentId, userData).then((comment) => {
      setBackendComments([comment, ...backendComments]); // Adding the new comment to the existing list for efficiency
      setActiveComment(null);
    });
  };
  
  // Once the Backend confirms the deletion , then update the UI
  const deleteComment = (commentId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updated = backendComments.filter((c) => c.id !== commentId);
        setBackendComments(updated);
      });
    }
  };

  // Updates the comment's text both on the backend and the frontend UI state
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.warn("No user is logged in");
        return;
      }
  
      getCommentsApi().then((data) => {
        setBackendComments(data);
      });
  
      getUserProfileApi(user.uid)
        .then((profileData) => {
          setUserData(profileData);
          console.log("Loaded user profile:", profileData);
        })
        .catch((e) => {
          console.error("Failed to load user profile:", e);
        });
    });
  
    return () => unsubscribe(); // Clean up listener
  }, []);
  
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