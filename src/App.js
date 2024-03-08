import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserDetails from './components/UserDetails';
import Footer from './components/Footer';
import './App.css';
import Dashboard from './components/Dashboard';
import ExpenseDetails from './components/ExpenseDetails';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main>
        <Router>
          <Routes >
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/userDetails" element={<UserDetails/>}/>
            <Route path="/expenseDetails" element={<ExpenseDetails/>}/>
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
}

export default App;
