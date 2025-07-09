export interface SubTabProps {
    postId: string;
    postUserId: string;
    currentUserId: string;
    onDeleteSuccess: () => void;
    isEditing: boolean;
    onToggleEdit: () => void;
    likes: number;
    dislikes: number;
    likedUsers: string[];
    dislikedUsers: string[];
  }