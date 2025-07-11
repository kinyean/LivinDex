import React, { useEffect, useState } from "react";
import CreatorList from "./CreatorList";
import { getSubs } from "../../Posts/GetSubs";
import { getUserProfile } from "../../../Pages/Profile/GetProfile";
import { UserDataProps as UserData } from "../../../Types/ProfileNavbar";
import { useParams } from "react-router-dom";

const CreatorHome: React.FC = () => {
  const [subscribedUsers, setSubscribedUsers] = useState<UserData[]>([]);
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

    fetchFollowing();
  }, [userId]);

  return (
    <>
      <div>
        <CreatorList users={subscribedUsers} />
      </div>

      <div>
        <h1 className="profile_subTitle">Posts</h1>    
       
      </div>
    </>
  );
};

export default CreatorHome;
