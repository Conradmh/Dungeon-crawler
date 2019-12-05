import React, { Component } from 'react';
import CreateMonsterModal from '../CreateMonsterModal/Index.js'


class GameContainer extends Component {
  constructor(){
    super();
    this.state = {
      squares: [],
      monsters:[],
      createMonsterModalOpen: false,

    }
  }
  componentDidMount(){
    this.getSquares();
    this.getMonsters();
  }
  getSquares = async () => {

    try {
      const squares = await
      fetch(process.env.REACT_APP_API_URL + '/api/squares');

      const parsedSquares = await squares.json();
      console.log(parsedSquares);

      this.setState({
        squares: parsedSquares
      });
    } catch (err) {
      console.log(err);
    }
  }
  getMonsters = async () => {

    try {
      const monsters = await
      fetch(process.env.REACT_APP_API_URL + '/api/monsters');

      const parsedMonsters = await monsters.json();

      console.log(parsedMonsters);

      this.setState({
        monsters: parsedMonsters
      });
      console.log(this.state);
    } catch (err) {
      console.log(err);
    }
  }
  createMonster = async (e, monsterFromTheForm) => {

    try {

      const createdMonsterResponse = await
      fetch(process.env.REACT_APP_API_URL + '/api/monsters', {
        method: 'POST',
        body: JSON.stringify(monsterFromTheForm),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createdMonsterResponse.json();


      this.setState({monsters: [...this.state.monsters, parsedResponse.data]})
      console.log(parsedResponse, 'this is parsedResponse');
      this.toggleCreateModal()

    } catch(err){
      console.log('error')
      console.log(err)
    }
  }
  toggleCreateModal = (e) => {
    this.setState({
      createMonsterModalOpen: !this.state.createMonsterModalOpen
    })
  }
  render(){
    return (
      <React.Fragment>

        <CreateMonsterModal
          open={this.state.createMonsterModalOpen}
          toggle={this.toggleCreateModal}
          create={this.createMonster}
          squares={this.state.squares}
        />
      </React.Fragment>
    );
  }
}
export default GameContainer;
