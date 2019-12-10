import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import DungeonModal from '../DungeonModal/Index.js'

class DungeonList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dungeonModalOpen: false,
      monsterArray: [],
      currentDungeonIndex: undefined
    }
  }
  findDungeonMonsters = (idx) => {
    const monsters = this.props.monsters

    const dungeon = this.props.dungeons[idx];
    console.log(dungeon, 'this is dungeon after called in find dungeon');
    const foundMonsters = dungeon.monsters.map(monsterId => {

       return  monsters.find((monster) => {
            if (monsterId === monster._id) {
              return monster
            }
            return false;
        })
      }
    )
    this.setState({
      monsterArray: foundMonsters
    })

    console.log(this.state, 'this is state in dungeon list');
  }
  toggleDungeonModal = (e) => {
    this.setState({
      dungeonModalOpen: !this.state.dungeonModalOpen
    })
  }
  render(props){
    console.log(this.props.dungeons, 'this is props.dungeons');
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
                  this.findDungeonMonsters(idx)
                  this.setState({
                    currentDungeonIndex: idx
                  })
                  this.toggleDungeonModal()
                }
              }>Show Dungeon</Button>
            </Card.Content>
          </Card>
        </React.Fragment>

      )
    })
    return (
      <React.Fragment>
        <Card.Group>
          { dungeons }
          { console.log(this.state.currentDungeonIndex, 'this is currentDungeonIndex')}

        </Card.Group>
        <DungeonModal
          open={this.state.dungeonModalOpen}
          dungeon={this.props.dungeons[this.state.currentDungeonIndex]}
          dungeonsMonsters={this.state.monsterArray}
          monsters={this.props.monsters}
          toggle={this.toggleDungeonModal}
        />
      </React.Fragment>
    )
  }
}
export default DungeonList
