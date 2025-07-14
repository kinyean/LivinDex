import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../../Styles/Profile.css';
import { getUserProfile } from '../../Pages/Profile/GetProfile';
import { getSubs } from '../Posts/GetSubs'; 
import { UserDataProps as UserData } from '../../Types/ProfileNavbar';
import SubscribersList from "./CreatorSubset/SubscriberList";
import SubscribersPost from "./CreatorSubset/SubscriberPosts";


const ProfileNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Subscriptions');
  const [subscribedUsers, setSubscribedUsers] = useState<UserData[]>([]);
  const [viewerUserId, setViewerUserId] = useState<string | null>(null);

  const { userId: paramId } = useParams();
  const [profileUserId, setProfileUserId] = useState<string | null>(paramId || null);
  
  useEffect(() => {
    const storedId = localStorage.getItem("uid");
    if (!storedId) {
      console.error("No userId found in localStorage.");
      return;
    }
    setViewerUserId(storedId);
  }, []);

  useEffect(() => {
    if (paramId) {
      setProfileUserId(paramId);
    } else {
      const uid = localStorage.getItem("uid");
      if (uid) setProfileUserId(uid);
    }
  }, [paramId]);  

  useEffect(() => {
    const fetchSubscribers = async () => {
      if (!profileUserId || viewerUserId !== profileUserId) return;

      try {
        console.log("Fetching subs for:", profileUserId);
        const subs = await getSubs(profileUserId);
        console.log("Subscribed to:", subs);

        const usersData = await Promise.all(
          subs.map(async (uid: string) => {
            const res = await getUserProfile(uid);
            return { uid, ...res };
          })
        );

        setSubscribedUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch subscribed users", error);
      }
    };

    if (activeTab === 'Subscriptions') {
      fetchSubscribers();
    }
  }, [activeTab, profileUserId, viewerUserId]);

  return (
    <>
      <nav className='profileNav-wrapper'>
        <ul className="profileNavbar">
          <li 
            className={`profileHover-underline ${activeTab === 'Subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('Subscriptions')}
          >
            Subscriptions
          </li>
          <li
            className={`profileHover-underline ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </li>
          <li
            className={`profileHover-underline ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            Liked
          </li>
        </ul>
      </nav>

      {activeTab === 'Subscriptions' && viewerUserId === profileUserId && (
        <>
          <SubscribersList users={subscribedUsers} />
          <SubscribersPost userIds={subscribedUsers.map(user => user.uid)} />
        </>
      )}


      {activeTab === 'Subscriptions' && viewerUserId !== profileUserId && (
        <p style={{ padding: "20px", fontStyle: "italic" }}>
          You have not authorized to view the user's subscriber list.
        </p>
      )}
    </>
  );
};

export default ProfileNavbar;
