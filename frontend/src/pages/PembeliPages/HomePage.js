import React from 'react';
import Home from '../../components/PembeliComponents/Home';
import Navbar from '../../components/PembeliComponents/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar page="home" />
      <Home />
    </div>
  );
};

export default HomePage;
