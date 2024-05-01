import React from 'react';
import './Navbar.css'
import CreatePost from '../pages/CreatePost'
import { Link } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar({onSearchInputChange, searchInput}) {

  function backToHome(){
    window.location = "/";
  }
//   const [filteredResults, setFilteredResults] = useState([]);
// const [searchInput, setSearchInput] = useState("");
// const searchItems = searchValue => {
//   setSearchInput(searchValue);
//   if (searchValue !== "") {
//     const filteredData = Object.keys(list.Data).filter((item) => 
//       Object.values(item)
//         .join("")
//         .toLowerCase()
//         .includes(searchValue.toLowerCase())
//     )
//     setFilteredResults(filteredData);
//   } else {
//     setFilteredResults(Object.keys(list.Data));
//   }
// };
// const handleChange = (event) => {
//   onSearchInputChange(event.target.value);
// };

// const [searchInput, setSearchInput] = useState('');

//   const handleSearchInputChange = (value) => {
//       setSearchInput(value);
//   };


const handleInputChange = (event) => {
  const { value } = event.target;
  onSearchInputChange(value);
};
  return (
    <nav className = 'navbar'>
        <h2 id="title" onClick={backToHome}>Music Share</h2>
        <input
                type="text"
                placeholder="Search..."
                value={searchInput} // Use searchInput from props
                onChange={handleInputChange}
            />
        <button className="headerBtn"><Link className="headerLink" to="/new"> Create Post </Link></button>  
  </nav>
  );
}

export default Navbar;
