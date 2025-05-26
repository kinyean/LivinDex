// src/Components/Comment/CommentService.ts
import { db } from "../../index"; // adjust path if needed
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export interface Comment {
  id: string;
  body: string;
  username: string;
  userId: string;
  parentId: string | null;
  createdAt: string; // or Timestamp if you don’t convert
}

export const getComments = async (): Promise<Comment[]> => {
  const snapshot = await getDocs(collection(db, "comments"));
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      body: data.body,
      username: data.username,
      userId: data.userId,
      parentId: data.parentId || null,
      createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString()
    };
  });
};

export const createComment = async (text: string, parentId: string | null): Promise<Comment> => {
  const commentData = {
    body: text,
    username: "Jack",         // replace with dynamic user
    userId: "1",              // replace with dynamic user ID
    parentId: parentId,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, "comments"), commentData);
  return {
    id: docRef.id,
    ...commentData,
    createdAt: new Date().toISOString(), // adjust for consistency
  };
};

export const updateComment = async (text: string, commentId: string): Promise<void> => {
  const commentRef = doc(db, "comments", commentId);
  await updateDoc(commentRef, {
    body: text,
  });
};

export const deleteComment = async (commentId: string): Promise<void> => {
  const commentRef = doc(db, "comments", commentId);
  await deleteDoc(commentRef);
};
