const { db, bucket, admin } = require('../firebase');

// For Post
exports.getPosts = async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ error: "UID is required" });

    const snapshot = await db
      .collection("posts")
      .where("userId", "==", uid) 
      .orderBy("createdAt", "desc")
      .get();

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// For Display
exports.getPostById = async (req, res) => {
  try {

    const { id } = req.params;
    const docRef = db.collection("posts").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const data = docSnap.data();
    res.status(200).json({
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For Home
exports.getAllPosts = async (req, res) => {
  try {

    const snapshot = await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const {id} = req.params;
    const docRef = db.collection("posts").doc(id);
    const docSnap = await docRef.get();
    const postData = docSnap.data();

    // Delete media files from Firebase Storage
    const mediaPaths = postData.storagePath || [];
    const thumbnailPath = postData.thumbnailPath;

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Post not found" });
    } 

    const deletePromises = [];

    // Delete each media file
    for (const path of mediaPaths) {
      const file = bucket.file(path);
      deletePromises.push(file.delete());
    }

    // Delete thumbnail file
    if (thumbnailPath) {
      const thumbFile = bucket.file(thumbnailPath);
      deletePromises.push(thumbFile.delete());
    }

    // Wait for all deletions
    await Promise.all(deletePromises);

    // Delete Firestore doc
    await docRef.delete();

    res.status(200).json({ message: "Post and media deleted" });


  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.editPostById = async (req, res) => {
  const { id } = req.params;
  const { header, text } = req.body;

  try {
    const postRef = db.collection('posts').doc(id);
    await postRef.update({ header, text });
    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post.' });
  }
}

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const postRef = db.collection("posts").doc(postId);
    const postSnap = await postRef.get();

    if (!postSnap.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postSnap.data();
    const likedUsers = postData.likedUsers || [];

    if (likedUsers.includes(userId)) {
      const updateData = {
        likedUsers: admin.firestore.FieldValue.arrayRemove(userId),
      };
    
      if ((postData.like || 0) > 0) {
        updateData.like = admin.firestore.FieldValue.increment(-1);
      }
    
      await postRef.update(updateData);
      return res.status(200).json({ message: "Like removed" });
    }
    

    const updateData = {
      likedUsers: admin.firestore.FieldValue.arrayUnion(userId),
      like: admin.firestore.FieldValue.increment(1),
    };

    if (postData.dislikedUsers?.includes(userId)) {
      updateData.dislikedUsers = admin.firestore.FieldValue.arrayRemove(userId);
      updateData.dislike = admin.firestore.FieldValue.increment(-1);
    }

    await postRef.update(updateData);
    res.status(200).json({ message: "Post liked" });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ error: "Failed to like post" });
  }
};

exports.dislikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const postRef = db.collection("posts").doc(postId);
    const postSnap = await postRef.get();

    if (!postSnap.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postSnap.data();
    const dislikedUsers = postData.dislikedUsers || [];
   
    if (dislikedUsers.includes(userId)) {
      const updateData = {
        dislikedUsers: admin.firestore.FieldValue.arrayRemove(userId),
      };
    
      if ((postData.dislike || 0) > 0) {
        updateData.dislike = admin.firestore.FieldValue.increment(-1);
      }
    
      await postRef.update(updateData);
      return res.status(200).json({ message: "Dislike removed" });
    }

    const updateData = {
      dislikedUsers: admin.firestore.FieldValue.arrayUnion(userId),
      dislike: admin.firestore.FieldValue.increment(1),
    };

    if (postData.likedUsers?.includes(userId)) {
      updateData.likedUsers = admin.firestore.FieldValue.arrayRemove(userId);
      updateData.like = admin.firestore.FieldValue.increment(-1);
    }

    await postRef.update(updateData);
    res.status(200).json({ message: "Post disliked" });
  } catch (err) {
    console.error("Error disliking post:", err);
    res.status(500).json({ error: "Failed to dislike post" });
  }
};
