import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class DungeonList extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentDungeonIndex: undefined
    }
  }
  renderDungeonSummary = () => {
    const monsters = this.props.monsters
    const dungeon = this.props.dungeons[this.state.currentDungeonIndex];
      console.log(dungeon, 'yolo');
    const foundMonsters =
      dungeon.monsters.map(monsterId => {

        return monsters.find((monster) => {
            if (monsterId === monster._id) {
              return true
            }
            return false;
          })
        }
    )
    return (
      <React.Fragment>
        <h1>{dungeon.name}</h1>
        <ul>
          {
            foundMonsters.map((monster) => {
              return (
                <li key={monster._id}>
                  {monster.name}{monster.level}{monster.xp}
                  {monster.boss ? 'is a boss' : 'is a minion'}
                </li>
              )
            })
          }
        </ul>
        <Button
          className="ui blue basic button"
          onClick={() => this.setState({currentDungeonIndex: undefined})}
        >Close</Button>
      </React.Fragment>
    );
    // this.props.difficulty:"",
    // completed: false
  }

  render(){
    const dungeons = this.props.dungeons.map((dungeon, idx) => {

      return (
          <Card className="blue card" key={dungeon._id}>
            <Card.Content>
              <Card.Header>{dungeon.name}</Card.Header>
              <Card.Description>{dungeon.difficulty}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Button
                className="ui blue basic button"
                onClick={() => {
                  console.log('butt', dungeon)
                  this.setState({
                  currentDungeonIndex: idx
                })}
              }>Edit Dungeon<
              /Button>
            </Card.Content>
          </Card>
      )
    }
  )
  return (
      <Card.Group>
        { this.state.currentDungeonIndex !== undefined && this.renderDungeonSummary() }
        { dungeons }
      </Card.Group>
    )
  }
}

export default DungeonList
