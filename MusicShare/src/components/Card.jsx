import React from 'react'
import { useState, useEffect } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'

const Card = (props) =>  {
  const getBackgroundColor = (flag) => {
    switch (flag) {
      case 'opinion':
        return '#65ba3f';
      case 'question':
        return '#ADD8E6';
      case 'announce':
        return '#FF5349';
      default:
        return 'white'; // Default color if the flag doesn't match any of the above
    }
  }
console.log(props.title);
  return (
      <Link to={'/view/' + props.id} className="link"><div className="Card" style={{ backgroundColor: getBackgroundColor(props.flag) }}>
          {/* <h2 className="title">{props.title}</h2>
          <h2 className="flag">{props.flag}</h2> */}
          <h2>{props.flag}</h2>
          <h3>{props.title}</h3>
          <div className="likes">
            <h2>👍 {props.likes}</h2>
          </div>
          <p>posted: {props.created_at}</p>
      </div></Link>
  );
};

export default Card;