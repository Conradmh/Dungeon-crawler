import React, { Component } from 'react';
import { Modal, Button, Form, Select, Dropdown, Checkbox } from 'semantic-ui-react';
import { updateDungeon } from '../../services.js';


class DungeonModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      difficulty: "",
      monsters: [],
      boss: undefined,
      completed: false,
      dungeonShow: true,
      dungeonToEdit: undefined
    }
  }
  handleChange = (e) => {
    this.setState(
      {[e.currentTarget.name]: e.currentTarget.value}
    )
  }
  handleDropDown = (e, data) =>{
    console.log(data, 'this is data');
    const boss = this.props.monsters.find((monster) => monster._id === data.value)
    console.log(boss, 'this is boss');
    this.setState({
      boss: boss
    });
  };
  showDungeonSummary = () => {

      return (
        <React.Fragment>
          <h1>{this.props.dungeon.name}</h1>
          <h2>{`Difficulty: ${this.props.dungeon.difficulty}`} </h2>
          <Checkbox
          label='Completion'
          checked={this.state.completed === true}
          style={{float:'right'} }
          />
            <ul>
              {
                this.props.dungeonsMonsters.map((monster) => {
                  return (
                    <li key={monster._id}>
                      {monster.name}
                      {monster.boss ? `: Level ${monster.level} Boss ` : ` : Level ${monster.level} Minion `}
                       {`worth ${monster.xp} xp.`}
                    </li>
                  )
                })
              }
            </ul>
            <Button
            className="ui blue basic button"
            onClick={() => {
              this.setState({
                dungeonShow: false
              })
            }}
            >Edit</Button>
        </React.Fragment>
      );

  }
  editDungeon = () => {
    const monsterOptions = this.props.monsters.map((monster) => {
      let mon = {
        key: monster._id,
        text: [
          "Lvl:",
          monster.level,
          " ",
          monster.name
        ],
        value: monster._id
      }
      return mon
    })
    const bosses = this.props.monsters.filter((monster) => monster.boss === true )
    const bossOptions = bosses.map((monster) => {
      let boss = {
        key: monster._id,
        text: [
          "Lvl:", monster.level,
          " ", monster.name
        ],
        value: monster._id
      }
      return boss
    })
    const options = [
      { key: 'easy', text: "Novice", value: "Easy" },
      { key: 'medium', text: "Adept", value: "Medium" },
      { key: 'hard', text: "Veteran", value: "Hard" },
    ];
        return(
          <React.Fragment>
            <Form onSubmit={() => {
              this.setState({
                boss: this.findBoss(this.state.boss)
              })
              updateDungeon(this.props.dungeon._id, this.state)
              this.setState({
                dungeonShow: true
              })
              this.props.get()
            }}>
              <Form.Input
                fluid
                name="name"
                placeholder={this.state.name}
                onChange={this.handleChange}
              />
              <Dropdown
                placeholder="Choose monster(s)"
                name="monsters"
                onChange={this.handleDropDown}
                fluid multiple selection
                options={monsterOptions}
              />
              <Select
                placeholder="Choose a boss"
                name="boss"
                onChange={this.handleDropDown}
                options={bossOptions}
              />
              <Select
              placeholder={this.state.difficulty}
              name="difficulty"
              onChange={this.handleDropDown}
              options={options}
              />
              <Form.Button>Submit</Form.Button>
            </Form>
            <Button
            className="ui blue basic button"
            onClick={() => {
              this.props.toggle()
              this.props.delete(this.props.dungeon._id)
            }}
            >Delete</Button>
            </React.Fragment>
        )
  }
  findDungeonBoss = (Id) => {
    const monsters = this.props.monsters
    const bosses = monsters.filter((monster) => monster.boss === true )

    const dungeon = this.props.dungeon;
    const foundBoss = bosses.filter((monster, monsterId) => {
      if (monster._id === monsterId) {
        return monster
      }
      return false;
       // return  monsters.find((monster) => {
       //      if (monsterId === monster._id) {
       //        return monster
       //      }
       //      return false;+
    })

    this.setState({
      boss: foundBoss
    })
  }
  findBoss = (id) => {
    return this.props.monsters.filter((monster) => monster._id === id)
  }
  render(props){
    return (
      <Modal
        open={this.props.open}
        closeIcon
        onClose={this.props.toggle}>

        {this.props.dungeon !== undefined && this.state.dungeonShow === true && this.showDungeonSummary() }
        {this.props.dungeon !== undefined && this.state.dungeonShow === false &&
        this.editDungeon() }

      </Modal>

    );
  }
}
export default DungeonModal;
