import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import LeagueList from './components/LeagueList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <LeagueList />
      </div>
    );
  }
}

export default App;
