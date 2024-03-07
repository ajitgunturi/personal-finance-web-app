import React, { useEffect, useState } from 'react';
import './UserDetails.css';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [visibleAccounts, setVisibleAccounts] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
        const initialVisibilityStates = data.reduce((acc, user) => ({ ...acc, [user.uuid]: false }), {});
        setVisibleAccounts(initialVisibilityStates);
      } catch (error) {
        console.error("Could not fetch user data:", error);
        setUserData([])
      }
    };

    fetchUserData();
  }, []);

  const handleToggleAccounts = (uuid) => {
    setVisibleAccounts(prev => ({ ...prev, [uuid]: !prev[uuid] }));
  };

  if (userData === null) {
    return <div className="user-details-container">Loading user data...</div>;
  } else if (userData.length === 0) {
    return <div className="user-details-container">Unable to fetch data from server</div>;
  }

  return (
    <div className="user-details-container">
      {userData.map(user => (
        <div key={user.uuid} className="user-card">
          <div className="user-detail"><label>Name:</label> {user.name}</div>
          <div className="user-detail"><label>Username:</label> {user.username}</div>
          <div className="user-detail"><label>Email:</label> {user.email}</div>
          <button className="show-accounts-btn" onClick={() => handleToggleAccounts(user.uuid)}>
            {visibleAccounts[user.uuid] ? 'Hide Accounts' : 'Show Accounts'}
          </button>
          {visibleAccounts[user.uuid] &&(
            <div className="user-accounts">
              {user.accounts.map((account, index) => (
                <div key={index} className="account">
                  <div><strong>Account Number:</strong> {account.accountNumber}</div>
                  <div><strong>IFSC Code:</strong> {account.ifscCode}</div>
                  <div><strong>Account Name:</strong> {account.name}</div>
                  <div><strong>Account Type:</strong> {account.accountType}</div>
                  <div><strong>Account Balance:</strong> {account.accountBalance}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
