import React from 'react';

const loadCanvas = require('../Utilities/loadCanvas');

class Game extends React.Component {
  componentDidMount() {
    loadCanvas();
  }

  render() {
    return (
      <div className='game-display'>
        <canvas id='game' width='800' height='600'></canvas>
      </div>
    );
  }
}

module.exports = Game;
