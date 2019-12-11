import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class GameBoard extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  showDoors = () => {
    return(
      <React.Fragment>
        <h1> These are Doors: </h1>
          <Card className="blue card" key='1'>
            <Card.Content>
              <Card.Header>Card 1</Card.Header>
              <Card.Description>Monster 1</Card.Description>
            </Card.Content>
          </Card>
          <Card className="green card" key='2'>
            <Card.Content>
              <Card.Header>Card 2</Card.Header>
              <Card.Description>Monster 2</Card.Description>
            </Card.Content>
          </Card>
          <Card className="red card" key='3'>
            <Card.Content>
              <Card.Header>Card 3</Card.Header>
              <Card.Description>Monster 3</Card.Description>
            </Card.Content>
          </Card>
          <Card className="yellow card" key='4'>
            <Card.Content>
              <Card.Header>Card 4</Card.Header>
              <Card.Description>Monster 4</Card.Description>
            </Card.Content>
          </Card>
      </React.Fragment>
    )
  }
  showDeck = () => {
    return (
      <React.Fragment>
        <h1> This is our Deck: </h1>
        <Card className="green card" key='0'>
          <Card.Content>
            <Card.Header>Deck</Card.Header>
            <Card.Description>This is our starting array</Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
  showCurrentMonster = () => {
    return (
      <React.Fragment>
        <h1> This is our Opponent: </h1>
        <Card className="red card" key='0'>
          <Card.Content>
            <Card.Header>Monster!</Card.Header>
            <Card.Description>This is what were fighting</Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
  render(){
   return (
     <React.Fragment>
       <h1> This is the GameBoard </h1>
       <Card.Group>
       {this.showDeck()}
       </Card.Group>
       <Card.Group>
         {this.showDoors()}
       </Card.Group>
       <Card.Group>
         {this.showCurrentMonster()}
       </Card.Group>
     </React.Fragment>
   );
  }
}
export default GameBoard;
