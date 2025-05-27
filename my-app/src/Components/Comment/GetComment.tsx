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
    userId: "1",
    username: "Jack",
  });
  return res.data;
};

export const updateComment = async (newBody: string, commentId: string) => {
  await BaseAPI.put(`/comments/${commentId}`, { body: newBody });
};

export const deleteComment = async (commentId: string) => {
  await BaseAPI.delete(`/comments/${commentId}`);
};


