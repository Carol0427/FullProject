import React from 'react'
import { useState, useEffect } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'

const Card = (props) =>  {

console.log(props);
  return (
      <Link to={'/view/' + props.id} className="link"><div className="Card">
          <h2 className="title">{props.title}</h2>
          <h3 className="flag">{props.flag}</h3>
          <div className="likes">
            <h2>👍 {props.likes}</h2>
          </div>
      </div></Link>
  );
};

export default Card;