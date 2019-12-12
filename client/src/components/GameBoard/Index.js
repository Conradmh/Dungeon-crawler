import React, { Component } from 'react';
import { Card, Grid, Container, Button, Form, Select } from 'semantic-ui-react';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      doors: [],
      currentMonster: [],
      boss: undefined,
      monsters:[],
      deck:[],
      player:undefined,
      characters:[],
      showForm: true,
      currentRedRollDamage: 0,
      currentBlueRollDamage: 0

    }
  }

  componentDidMount(){
    console.log("am i running?");
        this.populateDeck()
        this.populateDoors()
        this.populateCharacters()
        this.getBoss()
  }
  getBoss = () => {
    const thisBoss = this.props.activeDungeon.boss
    this.setState({
      boss: thisBoss
    })
  }
  populateBoss = () => {
    const newBoss = this.state.boss
    const currentMonsterArr = this.state.currentMonster
    currentMonsterArr.splice(0,1, newBoss)
    console.log(this.state, 'this is state after boss click');
  }
  populateCharacters = async () => {

    try {
      const characters = await
      fetch(process.env.REACT_APP_API_URL + '/api/characters');

      const parsedCharacters = await characters.json();

      this.setState({
        characters: parsedCharacters
      });
      console.log(this.state, 'this is state after mount');
    } catch (err) {
      console.log(err);
    }
  }
  populateCurrentMonster = (idx) => {
    const endSlice = idx + 1
    const currMonster = this.state.doors.slice(idx,endSlice)
    console.log(currMonster, 'this is currmosnter');
    this.setState({
      currentMonster: currMonster
    })
    this.state.doors.splice(idx, 1, {})
  }
  populateDoors = () => {
    const doorMonsters = this.state.deck.slice(0,4)
    this.setState({
      doors: doorMonsters
    })
  }
  populateDeck = () => {
    this.setState({
      deck: this.props.activeDungeonsMonsters
    })
  }
  showDoors = () => {
    console.log(this.state.doors, 'this is state.doors');
    console.log(this.props.activeDungeonsMonsters, 'this is acctive dungeonsMonsters  as props ');

    if(this.state.doors.length === 0) return null;

    return(
        <Grid  columns={4} divided>
          <React.Fragment>
            <h1> These are Doors: </h1>
            <Grid.Row>
              <Grid.Column>
                <Card className="blue card" key='0'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[0].name}</Card.Header>
                    <Card.Description>{this.state.doors[0].value}</Card.Description>
                  </Card.Content>
                  <Button
                  className="ui blue basic button"
                  onClick={() => {
                    this.populateCurrentMonster(0);
                  }}
                  >Fight</Button>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card className="green card" key='1'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[1].name}</Card.Header>
                    <Card.Description>{this.state.doors[1].value}</Card.Description>
                  </Card.Content>
                  <Button
                  className="ui green basic button"
                  onClick={() => {
                    this.populateCurrentMonster(1);
                    this.setState({
                      currentRedRollDamage: 0,
                      currentBlueRollDamage:0
                    })
                  }}
                  >Fight</Button>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card className="orange card" key='2'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[2].name}</Card.Header>
                    <Card.Description>{this.state.doors[2].value}</Card.Description>
                  </Card.Content>
                  <Button
                  className="ui orange basic button"
                  onClick={() => {
                    this.populateCurrentMonster(2);
                  }}
                  >Fight</Button>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card className="yellow card" key='3'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[3].name}</Card.Header>
                    <Card.Description>{this.state.doors[3].value}</Card.Description>
                  </Card.Content>
                  <Button
                  className="ui yellow basic button"
                  onClick={() => {
                    this.populateCurrentMonster(3);
                  }}
                  >Fight</Button>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </React.Fragment>
        </Grid>
    )
  }
  showDeck = () => {

    return (
      <React.Fragment>
        <h1> This is our Dungeon Deck: </h1>
        <Card className="green card" key='0'>
          <Card.Content>
            <Card.Header>Deck</Card.Header>
            <Card.Description>{this.state.deck.length}</Card.Description>
          </Card.Content>
          <Button
          className="ui Red basic button"
          onClick={() => {
            this.populateBoss();
          }}
          >Boss</Button>
          <Button
          className="ui blue basic button"
          onClick={() => {
            this.populateDoors();
          }}
          >Explore</Button>
        </Card>
      </React.Fragment>
    )
  }
  showCurrentMonster = () => {

    if(this.state.currentMonster.length === 0) return null;

    return (
      <React.Fragment>
        <h1> This is our Opponent: </h1>
        <Card className="red card" key='0'>
          <Card.Content>
            <Card.Header>{this.state.currentMonster[0].name}</Card.Header>
            <Card.Description>{`Health: ${this.state.currentMonster[0].squares.length}`}</Card.Description>
            <Card.Description>{`XP: ${this.state.currentMonster[0].xp}`}</Card.Description>
            <Card.Description>{`Damage: 1`}</Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
  showPlayer = () => {
    if(this.state.player === undefined) return null;
    return (
      <React.Fragment>
        <h1> This is Us: </h1>
        <Card className="purple card" key='5'>
          <Card.Content>
            <Card.Header>{this.state.player.name}</Card.Header>
            <Card.Description>{`Class: ${this.state.player.classType}`}</Card.Description>
            <Card.Description>{`Health: ${this.state.player.health}`}</Card.Description>
            <Card.Description>{`Strength: ${this.state.player.physAtk}`}</Card.Description>
            <Card.Description>{`Magic Power: ${this.state.player.magPwr}`}</Card.Description>
            <Card.Description>{`Current level: ${this.state.player.level}`}</Card.Description>
            <Card.Description>{`Red Damage: ${this.state.currentRedRollDamage}`}</Card.Description>
            <Card.Description>{`Blue Damage: ${this.state.currentBlueRollDamage}`}</Card.Description>

          </Card.Content>
          <Button
          className="ui red basic button"
          onClick={() => {
            this.setState({
              currentRedRollDamage: this.rollDice()
            })
          }}
          >Red</Button>
          <Button
          className="ui blue basic button"
          onClick={() => {
            this.setState({
              currentBlueRollDamage: this.rollDice()
            })
          }}
          >Blue</Button>
        </Card>
      </React.Fragment>
    )
  }
  showGame = () => {
    if (this.state.doors !== []) {
      return(
        <Grid columns={7}>
          <Grid.Row>

              <React.Fragment>
                <Card.Group>
                  {this.showDoors()}
                </Card.Group>
              </React.Fragment>
          </Grid.Row >
          <Grid.Row verticalAlign="bottom" textAlign="center">
            <React.Fragment>
              <Card.Group>
                {this.showPlayer()}
              </Card.Group>
            </React.Fragment>
          </Grid.Row>
          <Grid.Row>
            <React.Fragment>
              <Card.Group>
                {this.showCurrentMonster()}
              </Card.Group>
            </React.Fragment>
            <React.Fragment>
              <Card.Group>
                {this.selectCharacter()}
              </Card.Group>
            </React.Fragment>
          </Grid.Row>


          <Grid.Column floated='right'>
            <React.Fragment>
              <Card.Group>
              {this.showDeck()}
              </Card.Group>
            </React.Fragment>
          </Grid.Column>
        </Grid>
      )
    } else {
      return false
    }}
  selectCharacter = () => {
    const characterOptions = this.state.characters.map((person) => {
      let hero = {
        key: person._id,
        text: [
          person.name,
          " ",
          person.health,
          " ",
          person.physAtk,
          " ",
          person.magPwr,
          " ",
          person.level,
        ],
        value: person._id
      }
      return hero
    })
    if(this.state.showForm === false) return null;

    return(
      <React.Fragment>
        <Form onSubmit={() => {
          this.setState({
            showForm: false
          })
          console.log(this.state.player, 'this is player');
        }}>
          <Select
            placeholder="Select Character"
            name="player"
            onChange={this.onCharacterSelectionChange}
            options={characterOptions}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </React.Fragment>
    )
  }
  findCharacter = (id) => {
    return this.state.characters.find((person) => person._id === id)
  }
  onCharacterSelectionChange = (e, data) => {
    const chosenCharacter = this.findCharacter(data.value)
    console.log(chosenCharacter, 'this is chosenCharacter');
    this.setState({player: chosenCharacter})
  }
  rollDice = () => {
    return  Math.floor(Math.random()*3)
  }
  clearCurrentMonster = async () => {
    await this.setState({
      currentMonster: []
    })
  }
  render(){
    console.log(this.props.activeDungeon, 'this is activeDungeon');
    console.log(this.state, "this is  state");

    return (
      <Container>

            <React.Fragment>
              <h1> This is the GameBoard </h1>
              {this.showGame()}
              <Button
              className="ui pink basic button"
              onClick={() => {
                this.props.play(this.state.player)
              }}
              >Save and Quit</Button>
            </React.Fragment>

      </Container>
   );
  }
}
export default GameBoard;
