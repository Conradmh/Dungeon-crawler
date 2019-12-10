import React, { Component } from 'react';
import { Icon, Form, Header, Modal, Select, Dropdown} from 'semantic-ui-react';


class CreateDungeonModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      difficulty:"",
      monsters: [],
      boss: undefined,
      completed: false
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

  render(){
    const options = [
      { key: 'easy', text: "Novice", value: "easy" },
      { key: 'medium', text: "Adept", value: "medium" },
      { key: 'hard', text: "Veteran", value: "hard" },
    ];
    const monsters = this.props.monsters
    const monsterOptions = monsters.map((monster) => {
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
          "Lvl:",
          monster.level,
          " ",
          monster.name
        ],
        value: monster._id
      }
      return boss
    })
    return (
      <React.Fragment>
        <Icon
            className='plus'
            name='plus'
            size='massive'
            color='blue'
            circular
            onClick={this.props.toggle}
            width='100' height='100'
          />
        <Modal
          open={this.props.open}
          closeIcon
          onClose={this.props.toggle}>
          <Header>Create a Dungeon</Header>

              <Form onSubmit={(e) =>
                this.props.create(e, this.state)}>
                  <Form.Input
                    fluid
                    name="name"
                    placeholder='Dungeon Name'
                    onChange={this.handleChange}
                  />
                  <Dropdown
                    placeholder='Monsters'
                    name="monsters"
                    onChange={this.handleDropDown}
                    fluid multiple selection
                    options={monsterOptions}
                  />
                  <Select
                    placeholder='Select Dungeon Boss'
                    name="boss"
                    onChange={this.handleDropDown}
                    options={bossOptions}
                  />
                  <Select
                    placeholder='Select Dungeon Difficulty'
                    name="difficulty"
                    onChange={this.handleDropDown}
                    options={options}
                  />
                  <Form.Button>Submit</Form.Button>
              </Form>
        </Modal>
      </React.Fragment>
    );
  }
}
export default CreateDungeonModal;
