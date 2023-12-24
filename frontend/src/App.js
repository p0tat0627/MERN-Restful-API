import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import Home from './components/Home';
// import Latest from './components/Latest';
// import Tour from './components/Tour';
// import Album from './components/Album';
// import Gallery from './components/Gallery';
// import Merch from './components/Merch';

function App() {
  return (
    <div className="App">
      <h1>AvoidRafa Admin Panel File Uploader</h1>
      <Link to="Home">Home</Link> | <Link to="Latest">Latest</Link> |
      <Link to="Album">Album</Link> | <Link to="Gallery">Gallery</Link> 
    <br />
    <br />
    <Outlet />
    </div>
  );
}

export default App;