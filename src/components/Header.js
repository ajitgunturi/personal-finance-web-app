import React from 'react';
import './Header.css'; 
import { Heading, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    
          <header className="header-container">
            <Heading fontSize={'x-large'} >Personal Finance Application</Heading>
              <Link href='/'>Home</Link>
              <Link href='/userdetails'>UserDetails</Link>
              <Link href='/expenseDetails'>Expenses</Link>
          </header>
    
  );
};

export default Header;
