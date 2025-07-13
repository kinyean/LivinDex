import React, { useEffect, useState } from "react";
import CreatorList from "./Home/CreatorList";
import CreatorHomePosts from "./Home/CreatorHomePosts";
import { getSubs } from "../../Posts/GetSubs";
import { getUserProfile } from "../../../Pages/Profile/GetProfile";
import { UserDataProps as UserData } from "../../../Types/ProfileNavbar";
import { getPosts as getPostsAPI } from "../../Posts/GetPosts";
import { Post } from "../../Posts/GetPosts";
import { useParams } from "react-router-dom";

const CreatorHome: React.FC = () => {
  const [subscribedUsers, setSubscribedUsers] = useState<UserData[]>([]);
  const [creatorPosts, setCreatorPosts] = useState<Post[]>([]); 

  const { userId } = useParams(); 

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!userId) return;

      try {
        const subs = await getSubs(userId);

        const usersData = await Promise.all(
          subs.map(async (uid: string) => {
            const res = await getUserProfile(uid);
            return { uid, ...res };
          })
        );

        setSubscribedUsers(usersData);
      } catch (error) {
        console.error("Error fetching following users:", error);
      }
    };

    const fetchCreatorPosts = async () => {
      if (!userId) return;

      try {
        const posts = await getPostsAPI(userId);
        setCreatorPosts(posts);
      } catch (error) {
        console.error("Error fetching creator posts:", error);
      }
    };

    fetchFollowing();
    fetchCreatorPosts();
  }, [userId]);

  return (
    <>
      <div>
        <CreatorList users={subscribedUsers} />
      </div>

      <div>
      <CreatorHomePosts posts={creatorPosts} />
      </div>
    </>
  );
};

export default CreatorHome;
