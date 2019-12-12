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
  onMonstersSelectionChange = (e, data) => {
    this.setState({monsters: data.value})
  }
  onBossChange = (e, data) =>{
    this.findDungeonBoss(data.value)

  };
  onDifficultyChange = (e, data) => {

    this.setState({difficulty: data.value})

  }
  showDungeonSummary = () => {
      return (
        <React.Fragment>
          <h1>{this.props.dungeon.name}</h1>
          <h2>{`Difficulty: ${this.props.dungeon.difficulty}`} </h2>
          <h3>{`Boss: ${this.props.dungeon.boss.name}`}  </h3>
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
            className="ui pink basic button"
            onClick={() => {
              this.props.play(this.props.dungeon)
            }}
            >Play</Button>
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
    const nonBossMonsters = this.props.monsters.filter((monster) => monster.boss === false)
    const monsterOptions = nonBossMonsters.map((monster) => {
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
            <Form onSubmit={async () => {
              let curBoss = this.findBoss(this.state.boss)
              this.setState({
                boss: curBoss
              })
              console.log(this.state, 'this is state before upd dungeon')
              await updateDungeon(this.props.dungeon._id, this.state);
              this.setState({
                dungeonShow: true
              })
              this.props.refresh()
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
                onChange={this.onMonstersSelectionChange}
                fluid multiple selection
                options={monsterOptions}
              />
              <Select
                placeholder="Select Boss"
                name="boss"
                onChange={this.onBossChange}
                options={bossOptions}
              />
              <Select
              placeholder={this.state.difficulty}
              name="difficulty"
              onChange={this.onDifficultyChange}
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
  findDungeonBoss = (id) => {
    const monsters = this.props.monsters
    const bosses = monsters.filter(monster => monster.boss === true )
    console.log(bosses, 'these are the possible bosses');
    const foundBoss = bosses.find(monster => monster._id === id)
    console.log(foundBoss, 'this is foundBoss');
    this.setState({
      boss: foundBoss
    })
  }
  findBoss = (id) => {
    return this.props.monsters.filter((monster) => monster._id === id)
  }
  toggleDungeonAndModal = () => {
    this.setState({
      dungeonShow: !this.state.dungeonShow
    })
    this.props.toggleModal()
  }

  render(props){
    console.log(this.state, 'this is state in render modal');
    return (
      <Modal
        open={this.props.open}
        closeIcon
        onClose={this.toggleDungeonAndModal}>

        {this.props.dungeon !== undefined && this.state.dungeonShow === true && this.showDungeonSummary() }
        {this.props.dungeon !== undefined && this.state.dungeonShow === false &&
        this.editDungeon() }

      </Modal>

    );
  }
}
export default DungeonModal;
