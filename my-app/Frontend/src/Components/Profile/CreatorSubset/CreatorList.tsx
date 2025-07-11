import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../Assets/UnknownUser.jpg";
import { UserDataProps as UserData } from "../../../Types/ProfileNavbar";
import { useNavigate } from "react-router-dom";
import { getSubs, subscribe, unsubscribe } from "../../Posts/GetSubs";
import  '../../../Styles/Profile.css';

type Props = {
  users: UserData[];
};

const CreatorList: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [subscribedTo, setSubscribedTo] = useState<string[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem("uid");
    if (storedId) {
      setViewerId(storedId);
      getSubs(storedId).then((subs) => setSubscribedTo(subs));
    }
  }, []);

  const handleSubscribe = async (targetUserId: string) => {
    if (!viewerId) return;

    const isSubbed = subscribedTo.includes(targetUserId);

    try {
      if (isSubbed) {
        await unsubscribe(viewerId, targetUserId);
        setSubscribedTo((prev) => prev.filter((id) => id !== targetUserId));
      } else {
        await subscribe(viewerId, targetUserId);
        setSubscribedTo((prev) => [...prev, targetUserId]);
      }
    } catch (err) {
      console.error("Subscription action failed", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="tab_heading">Your creator's following:</h1>
      <div className="subscribers_list">
        {users.map((user) => {
          const isSubbed = subscribedTo.includes(user.uid);
          const isSelf = viewerId === user.uid;

          return (
            <div
              key={user.uid}
              className="subscriber-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={user.profileImg || defaultAvatar}
                alt="avatar"
                style={{ cursor: 'pointer' }}
                className="profile_avatar"
                onClick={() => navigate(`/creator/${user.uid}`)}
              />
              <p
                style={{
                  fontWeight: "bold",
                  color: "var(--body_color)",
                  margin: "8px 0 4px 0",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/creator/${user.uid}`)}
              >
                {user.firstName || user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Anonymous"}
              </p>

              {!isSelf && (
                <button
                  className="creatorSubscribe_button"
                  onClick={() => handleSubscribe(user.uid)}
                >
                  {isSubbed ? "Unsubscribe" : "Subscribe"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CreatorList;
