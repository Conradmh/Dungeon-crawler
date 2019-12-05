import React, { Component } from 'react';
import CreateMonsterModal from '../CreateMonsterModal/Index.js'
import CreateDungeonModal from '../CreateDungeonModal/Index.js'

class GameContainer extends Component {
  constructor(){
    super();
    this.state = {
      squares: [],
      monsters:[],
      dungeons: [],
      createMonsterModalOpen: false,
      createDungeonModalOpen: false

    }
  }
  componentDidMount(){
    this.getSquares();
    this.getMonsters();
    this.getDungeons();
  }
  getSquares = async () => {

    try {
      const squares = await
      fetch(process.env.REACT_APP_API_URL + '/api/squares');

      const parsedSquares = await squares.json();


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

      this.setState({
        monsters: parsedMonsters
      });
    } catch (err) {
      console.log(err);
    }
  }
  getDungeons = async () => {

    try {
      const dungeons = await
      fetch(process.env.REACT_APP_API_URL + '/api/dungeons');

      const parsedDungeons = await dungeons.json();

      this.setState({
        dungeons: parsedDungeons
      });
      console.log(this.state, 'this is state after mount');
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
      console.log(parsedResponse, 'this is the New Monster');
      this.toggleCreateMonsterModal()

    } catch(err){
      console.log('error')
      console.log(err)
    }
  }
  createDungeon = async (e, dungeonFromTheForm) => {

    try {

      const createdDungeonResponse = await
      fetch(process.env.REACT_APP_API_URL + '/api/dungeons', {
        method: 'POST',
        body: JSON.stringify(dungeonFromTheForm),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createdDungeonResponse.json();


      this.setState({dungeons: [...this.state.dungeons, parsedResponse.data]})
      console.log(parsedResponse, 'this is the New Dungeon');
      this.toggleCreateDungeonModal()

    } catch(err){
      console.log('error')
      console.log(err)
    }
  }
  toggleCreateMonsterModal = (e) => {
    this.setState({
      createMonsterModalOpen: !this.state.createMonsterModalOpen
    })
  }
  toggleCreateDungeonModal = (e) => {
    this.setState({
      createDungeonModalOpen: !this.state.createDungeonModalOpen
    })
  }
  render(){
    return (
      <React.Fragment>

        <CreateMonsterModal
          open={this.state.createMonsterModalOpen}
          toggle={this.toggleCreateMonsterModal}
          create={this.createMonster}
          squares={this.state.squares}
        />
        <CreateDungeonModal
          open={this.state.createDungeonModalOpen}
          toggle={this.toggleCreateDungeonModal}
          create={this.createDungeon}
          monsters={this.state.monsters}
        />
      </React.Fragment>
    );
  }
}
export default GameContainer;
