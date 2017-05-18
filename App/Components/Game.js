import React from 'react';
import PropTypes from 'prop-types';

//const Generate = require('../Utilities/generateMap');
const loadCanvas = require('../Utilities/loadCanvas');

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

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
