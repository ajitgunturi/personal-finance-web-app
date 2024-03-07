import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserDetails from './components/UserDetails';
import Footer from './components/Footer';
import './App.css';

const Home = () => <div className="App">Welcome to personal finance application!</div>;

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userdetails" element={<UserDetails />} />
        </Routes>
      </div>
      
      <footer>
        <Footer />
      </footer>
        

    </Router>
  );
}

export default App;
