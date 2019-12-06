import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import DungeonModal from '../DungeonModal/Index.js'

class DungeonList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dungeonModalOpen: false,
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
                  {monster.name}
                  {monster.boss ? ': is a boss. ' : ': is a minion. '}
                  {monster.level} {monster.xp}
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

  }
  toggleDungeonModal = (e) => {
    this.setState({
      dungeonModalOpen: !this.state.dungeonModalOpen
    })
  }
  render(props){

    const dungeons = this.props.dungeons.map((dungeon, idx) => {

      return (
        <React.Fragment>
          <Card className="blue card" key={dungeon._id}>
            <Card.Content>
              <Card.Header>{dungeon.name}</Card.Header>
              <Card.Description>{dungeon.difficulty}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Button
                className="ui blue basic button"
                onClick={() => {
                  console.log('modal button clicked', this.state.currentDungeonIndex);
                  this.toggleDungeonModal()
                  this.setState({
                    currentDungeonIndex: idx
                  })
                }
              }>Edit Dungeon</Button>
            </Card.Content>
          </Card>
        </React.Fragment>

      )
    })
    return (
      <React.Fragment>
        <Card.Group>
          { dungeons }
        </Card.Group>
        <DungeonModal
          open={this.state.dungeonModalOpen}
          dungeons={this.props.dungeons}
          edit={this.props.edit}
          update={this.props.update}
          monsters={this.props.monsters}
          render={this.renderDungeonSummary}
          toggle={this.toggleDungeonModal}
        />
      </React.Fragment>
    )

  }
}

export default DungeonList
