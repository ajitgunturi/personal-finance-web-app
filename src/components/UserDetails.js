import React, { useEffect, useState } from 'react';
import './UserDetails.css';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:9090/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Could not fetch user data:", error);
        setUserData([])
      }
    };

    fetchUserData();
  }, []);

  if (userData === null) {
    return <div className="user-details-container">Loading user data...</div>;
  } else if (userData.length === 0) {
    return <div className="user-details-container">Unable to fetch data from server</div>;
  }

  return (
    <div className="user-details-container">
      {userData.map(user => (
        <div key={user.uuid} className="user-card">
          <div className="user-detail"><label>First Name:</label> {user.firstName}</div>
          <div className="user-detail"><label>Last Name:</label> {user.lastName}</div>
          <div className="user-detail"><label>Email:</label> {user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
