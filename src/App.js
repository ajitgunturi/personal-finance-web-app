import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserDetails from './components/UserDetails';
import Footer from './components/Footer';
import './App.css';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

const Home = () => <div className="App">Welcome to personal finance application!</div>;

function App() {
  return (
    <div className="App">

        <Header />

      <main>
      <Tabs >
  <TabList>
    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Home</Tab>
    <Tab _selected={{ color: 'white', bg: 'green.400' }}>UserDetails</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p><UserDetails/></p>
    </TabPanel>
  </TabPanels>
</Tabs>
      </main>
      
        <Footer />
      
        

    </div>
  );
}

export default App;
