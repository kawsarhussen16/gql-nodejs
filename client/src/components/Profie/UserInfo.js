import React from "react";
import { Link } from "react-router-dom";

const formateDate = (date) => {
  date = Number(date);
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};
const UserInfo = ({ session }) => {
  return (
    <div className="App">
      <h3>User Info</h3>
      <h5>Username: {session.getCurrentUser.username}</h5>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Join Date: {formateDate(session.getCurrentUser.joinDate)}</p>
      <ul>
        <h3>{session.getCurrentUser.username}'s Favorites</h3>
        {session.getCurrentUser.favorites.map((fav) => (
          <li key={fav._id}>
            <Link to={`/recipes/${fav._id}`}>
              {" "}
              <p>{fav.name}</p>
            </Link>
          </li>
        ))}
        {!session.getCurrentUser.favorites.length && (
          <p>You have no favorits currently</p>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
