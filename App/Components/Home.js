import React from 'react';

const Link = require('react-router-dom').Link;

function Home() {
  return (
    <div className='home-screen'>
      <div className='header'>
        The Cluckening
      </div>
      <div className='home-body'>
        <p>Use your arrow keys to navigate through the world.</p>
        <p>Kill the bad guys, grab some loot.</p>
        <p>Show them they're clucking with the wrong chicken.</p>
      </div>
      <div className='home-button-row'>
        <Link to='/Game'>
          <div className='home-button'>
            Start
          </div>
        </Link>
      </div>
    </div>
  )
}

module.exports = Home;
