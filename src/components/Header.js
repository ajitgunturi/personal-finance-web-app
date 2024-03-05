import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-title">Personal Finance Application</div>
      <nav className="header-nav">
        <a href="/userdetails" className="nav-link">User Details</a>
      </nav>
    </header>
  );
};

export default Header;
