import React, { Component } from 'react';
import { Modal, Button, Form, Select, Dropdown } from 'semantic-ui-react';
import dungeonUpdate from '../../services.js';


class DungeonModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      difficulty: "",
      monsters: [],
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
    this.setState({
      [data.name]: data.value
    });
  };
  showDungeonSummary = () => {

      return (
        <React.Fragment>
          <h1>{this.props.dungeon.name}</h1>
            <ul>
              {
                this.props.dungeonsMonsters.map((monster) => {
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
    console.log(this.props.monsters, 'this is .props.monsters');
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
    console.log(monsterOptions, 'this is monsterOptions');
    const options = [
      { key: 'easy', text: "Novice", value: "easy" },
      { key: 'medium', text: "Adept", value: "medium" },
      { key: 'hard', text: "Veteran", value: "hard" },
    ];
        return(
          <React.Fragment>
            <Form onSubmit={() => {
              dungeonUpdate(this.props.dungeon._id, this.state)
              this.setState({
                dungeonShow: true
              }, console.log(this.state, 'this is state after edit'))
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

  render(props){
    console.log(this.props.currentDungeonIndex, 'this is currentDungeonIndex in modal render');
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
