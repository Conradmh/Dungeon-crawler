import React, { Component } from 'react';
import { Card, Grid, Container, Button } from 'semantic-ui-react';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      doors: [],
      monster: undefined,
      monsters:[],
      deck:[],
      player:{
        name: 'Johanna',
        skill: 'Blinding Enemies'
      }
    }
  }

  componentDidMount(){
    console.log("am i running?");
        this.populateDoors()

  }
  populateDoors = () => {
    this.setState({
      doors: this.props.activeDungeonsMonsters
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
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card className="green card" key='1'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[1].name}</Card.Header>
                    <Card.Description>{this.state.doors[1].value}</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card className="orange card" key='2'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[2].name}</Card.Header>
                    <Card.Description>{this.state.doors[2].value}</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card className="yellow card" key='3'>
                  <Card.Content>
                    <Card.Header>{this.state.doors[3].name}</Card.Header>
                    <Card.Description>{this.state.doors[3].value}</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </React.Fragment>
        </Grid>
    )
  }
  showDeck = () => {
    if(this.state.deck.length === 0) return null;

    return (
      <React.Fragment>
        <h1> This is our Dungeon Deck: </h1>
        <Card className="green card" key='0'>
          <Card.Content>
            <Card.Header>Deck</Card.Header>
            <Card.Description>{this.state.deck[0].name}</Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
  showCurrentMonster = () => {
    if(this.state.monster === undefined) return null;

    return (
      <React.Fragment>
        <h1> This is our Opponent: </h1>
        <Card className="red card" key='0'>
          <Card.Content>
            <Card.Header>{this.state.monster.name}</Card.Header>
            <Card.Description>{this.state.monster.catchPhrase}</Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
  showPlayer = () => {
    return (
      <React.Fragment>
        <h1> This is Us: </h1>
        <Card className="purple card" key='5'>
          <Card.Content>
            <Card.Header>{this.state.player.name}</Card.Header>
            <Card.Description>{this.state.player.skill}</Card.Description>
          </Card.Content>
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
    }
  };
  render(){
    console.log(this.props.activeDungeon, 'this is activeDungeon');
    console.log(this.state.monsters, "this is monsters in state");

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
