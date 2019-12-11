import React, { Component } from 'react';
import './App.css';
import GameContainer from './components/GameContainer/Index.js'
import GameBoard from './components/GameBoard/Index.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      isPlaying: false
    }
  }
  render(){
    return (
      <div className="App">
      {this.state.isPlaying === true ? <GameContainer /> : <GameBoard />}

      </div>
    );
  }
}

export default App;
