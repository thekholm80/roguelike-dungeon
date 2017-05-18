import React from 'react';

const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

const Home = require('./Home');
const Game = require('./Game');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/game' component={ Game } />
            <Route render={ () => {
              return (
                <div className='FourOhFour'>
                  404:  Nothing to see here, move along.
                </div>
              );
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
