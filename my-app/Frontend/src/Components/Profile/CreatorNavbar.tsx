import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../../Styles/Profile.css';
import { getUserProfile } from '../../Pages/Profile/GetProfile';
import { getSubs } from '../Posts/GetSubs'; 
import { UserDataProps as UserData } from '../../Types/ProfileNavbar';
import CreatorPosts from './CreatorSubset/CreatorPosts';
import CreatorChallenge from './CreatorSubset/CreatorChallenge';
import CreatorHome from './CreatorSubset/CreatorHome';


const CreatorNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('subscriber');
  const [subscribedUsers, setSubscribedUsers] = useState<UserData[]>([]);
  const [viewerUserId, setViewerUserId] = useState<string | null>(null);

  const { userId: profileUserId } = useParams(); 

  useEffect(() => {
    const storedId = localStorage.getItem("uid");
    if (!storedId) {
      console.error("No userId found in localStorage.");
      return;
    }
    setViewerUserId(storedId);
  }, []);

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

    if (activeTab === 'subscriber') {
      fetchSubscribers();
    }
  }, [activeTab, profileUserId, viewerUserId]);

  return (
    <>
      <nav className='profileNav-wrapper'>
        <ul className="profileNavbar">
          <li
            className={`profileHover-underline ${activeTab === 'subscriber' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriber')}
          >
            Home
          </li>
          <li
            className={`profileHover-underline ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Posts
          </li>
          <li
            className={`profileHover-underline ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            Community Challenge
          </li>
        </ul>
      </nav>

      {activeTab === 'subscriber' && (
        <CreatorHome />
      )}

      {activeTab === 'favorites' && (
        <CreatorPosts />
      )}

      {activeTab === 'liked' && (
        <CreatorChallenge />
      )}
    </>
  );
};

export default CreatorNavbar;
