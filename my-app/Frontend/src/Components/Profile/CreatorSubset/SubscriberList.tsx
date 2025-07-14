import React from "react";
import defaultAvatar from "../../../Assets/UnknownUser.jpg";
import { UserDataProps as UserData } from "../../../Types/ProfileNavbar";
import { useNavigate } from "react-router-dom";

type Props = {
  users: UserData[];
};

const SubscribersList: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="tab_heading">People who you follow</h1>
      <div className="subscribers_list">
        {users.map((user) => (
          <div key={user.uid} className="subscriber-card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={user.profileImg || defaultAvatar}
              style={{ cursor: 'pointer' }}
              alt="avatar"
              className="profile_avatar"
              onClick={() => navigate(`/creator/${user.uid}`)}
            />
            <p 
              style={{ fontWeight: "bold",
                       color: "var(--body_color)" ,
                       margin: "8px 0 4px 0",  
                       cursor: 'pointer' }} 
              onClick={() => navigate(`/creator/${user.uid}`)}
            >
              {(user.firstName || user.lastName)
                ? `${user.firstName} ${user.lastName}`
                : "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubscribersList;