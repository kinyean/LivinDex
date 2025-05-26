// // src/Components/Comment/CommentService.ts
// import { db } from "../../index"; // adjust path if needed
// import {
//   collection,    // Gets a reference to a Firestore Collection  (According to Google)
//   addDoc,        // Adds a new document 
//   getDocs,       // Retreives all document
//   updateDoc,     // Update exiting document
//   deleteDoc,     // Deletes a document
//   doc,           // Points to the document
//   Timestamp,     // Creates Firestore-compatible timestamp
// } from "firebase/firestore";

// export interface Comment {
//   id: string;                   // ID that is tag at the comment
//   body: string;
//   username: string;
//   userId: string;               // TODO: Once profile is set up edit the User ID so the comment can retrieve the name of the commenter
//   parentId: string | null;      // It is used so that the child can tag under the parentID
//   createdAt: string; 
// }

// export const getComments = async (): Promise<Comment[]> => {
//   const snapshot = await getDocs(collection(db, "comments"));
//   return snapshot.docs.map((docSnap) => {
//     const data = docSnap.data();
//     return {
//       id: docSnap.id,
//       body: data.body,
//       username: data.username,
//       userId: data.userId,
//       parentId: data.parentId || null,
//       createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString()
//     };
//   });
// };

// export const createComment = async (text: string, parentId: string | null): Promise<Comment> => {
//   const commentData = {
//     body: text,
//     username: "Jack",         // replace with dynamic user
//     userId: "1",              // replace with dynamic user ID
//     parentId: parentId,
//     createdAt: Timestamp.now(),
//   };

//   const docRef = await addDoc(collection(db, "comments"), commentData);
//   return {
//     id: docRef.id,
//     ...commentData,
//     createdAt: new Date().toISOString(), // adjust for consistency
//   };
// };

// export const updateComment = async (text: string, commentId: string): Promise<void> => {
//   const commentRef = doc(db, "comments", commentId);
//   await updateDoc(commentRef, {
//     body: text,
//   });
// };

// export const deleteComment = async (commentId: string): Promise<void> => {
//   const commentRef = doc(db, "comments", commentId);
//   await deleteDoc(commentRef);
// };


import BaseAPI from "../../API/BaseAPI";

export interface Comment {
  id: string;                   // ID that is tag at the comment
  body: string;
  username: string;
  userId: string;               // TODO: Once profile is set up edit the User ID so the comment can retrieve the name of the commenter
  parentId: string | null;      // It is used so that the child can tag under the parentID
  createdAt: string; 
}

export const getComments = async () => {
  const res = await BaseAPI.get("/comments");
  return res.data;
};

export const createComment = async (body: string, parentId: string | null) => {
  const res = await BaseAPI.post("/comments", {
    body,
    parentId,
    // optionally pass user info if not in token
    userId: "1",
    username: "Jack",
  });
  return res.data;
};

export const updateComment = async (commentId: string, newBody: string) => {
  await BaseAPI.put(`/comments/${commentId}`, { body: newBody });
};

export const deleteComment = async (commentId: string) => {
  await BaseAPI.delete(`/comments/${commentId}`);
};