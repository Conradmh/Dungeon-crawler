import React, { Component } from 'react';
import './App.css';
import GameContainer from './components/GameContainer/Index.js'
import GameBoard from './components/GameBoard/Index.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      activeDungeon: undefined,
      isPlaying: true
    }
  }
  toggleIsPlaying = (obj) => {
    this.setState({
      activeDungeon: obj,
      isPlaying: !this.state.isPlaying
    })
  }
  render(){
    return (
      <div className="App">
      {this.state.isPlaying === true
       ? <GameContainer play={this.toggleIsPlaying}/>
       : <GameBoard activeDungeon={this.state.activeDungeon} play={this.toggleIsPlaying}/>}

      </div>
    );
  }
}

export default App;
