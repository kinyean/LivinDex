import React, { useEffect, useState } from 'react';
import '../Styles/Profile.css';
import { getUserProfile } from '../Pages/Profile/GetProfile';
import { getSubs } from '../Components/Posts/GetSubs'; 
import defaultAvatar from '../Assets/UnknownUser.jpg';
import { UserDataProps as UserData } from '../Types/ProfileNavbar';

const currentUserId = localStorage.getItem("uid") || ""; 

const ProfileNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('subscriber');
  const [subscribedUsers, setSubscribedUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        console.log("Fetching subs for:", currentUserId);
        const subs = await getSubs(currentUserId);
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
  }, [activeTab]);

  return (
    <>
      <nav className='profileNav-wrapper'>
        <ul className="profileNavbar">
          <li
            className={`profileHover-underline ${activeTab === 'subscriber' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriber')}
          >
            Subscriber
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

      {activeTab === 'subscriber' && (
        <>
          <h1 className="tab_heading">Subscribers</h1>
          <div className="subscribers-list">
            {subscribedUsers.map((user) => (
              <div key={user.uid} className="subscriber-card">
                <img
                  src={user.profileImg || defaultAvatar}
                  alt="avatar"
                  className="avatar"
                />
                <p>{(user.firstName || user.lastName) ? `${user.firstName} ${user.lastName}` : "Anonymous"}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileNavbar;
