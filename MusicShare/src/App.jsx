import './App.css';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import ViewPost from './pages/ViewPost';
import React, { useState, useEffect } from 'react';


const App = () => { 

  
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (value) => {
      setSearchInput(value);
  };
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts/>
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path: "/view/:id",
      element: <ViewPost/>
    },
    {
      path:"/edit/:id",
      element: <EditPost/>
    },
  ]);

  return ( 

    <div className="App">
      <div className="header">
        {/* <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link> */}
      </div>
        {element}
    </div>

  );
}

export default App;
