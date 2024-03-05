import React from 'react';
import './UserDetails.css';

const userData = [
  {
    "uuid": 1,
    "name": "Ajit Kumar",
    "username": "ajitgunturi",
    "email": "ajit.gunturi@gmail.com",
    "accounts": [
      {
        "accountNumber": 123456789,
        "ifscCode": "ABCD0001234",
        "name": "Ajit Kumar",
        "accountType": "Savings",
        "accountBalance": 10000,
        "user": "ajitgunturi"
      }
    ]
  },
  {
    "uuid": 3,
    "name": "Ajit Kumar",
    "username": "ajitgunturi",
    "email": "ajit.gunturi1@gmail.com",
    "accounts": []
  }
];

const UserDetails = () => {
  return (
    <div className="user-details-container">
      {userData.map(user => (
        <div key={user.uuid}>
          <div className="user-detail">
            <label>Name:</label> {user.name}
          </div>
          <div className="user-detail">
            <label>Username:</label> {user.username}
          </div>
          <div className="user-detail">
            <label>Email:</label> {user.email}
          </div>
          {user.accounts && user.accounts.length > 0 && (
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
}

export default UserDetails;
