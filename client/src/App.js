import React, { Component } from 'react';
import './App.css';
import GameContainer from './components/GameContainer/Index.js'

class App extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  render(){
    return (
      <div className="App">
      <GameContainer />
      </div>
    );
  }
}

export default App;
