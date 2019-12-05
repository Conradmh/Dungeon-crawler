import React, { Component } from "react";
import { Icon, Form, Header, Modal, Dropdown, Select } from 'semantic-ui-react';

class CreateMonsterModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      level: '1',
      squares: [],
      xp: '',
      boss: false
    }
  };
  handleChange = (e) =>{
    e.preventDefault();
    this.setState(
      {[e.currentTarget.name]: e.currentTarget.value})
  };
  handleDropDown = (e, data) =>{
    this.setState({
      [data.name]: data.value
    });
  };
  handleRadioChange = (e) =>{
    e.preventDefault();
    console.log("what you clicked\n", e.currentTarget.firstElementChild);
    console.log("its name\n",e.currentTarget.firstElementChild.name);
    this.setState(
      {[e.currentTarget.firstElementChild.name]: e.currentTarget.firstElementChild.value})
  }
  toggleBoss = (e) => {
    this.setState({
      boss: !this.state.boss
    })
  }
  render(){
    const options = [
      { key: '0', text: "0", value: "0" },
      { key: '1', text: "1", value: "1" },
      { key: '2', text: "2", value: "2" },
      { key: '3', text: "3", value: "3" },
    ]
    const squares = this.props.squares
    console.log(squares, 'this is squares');
    const squareOptions = squares.map((square) => {
      let sqr = {key: square._id, text: [square.color, square.value, square.damage, square.poison], value: square._id}
      return sqr
    })
    console.log(squareOptions, 'this is squareOptions');

    return (
      <React.Fragment>
        <Icon
          className='plus'
          name='plus'
          size='massive'
          color='pink'
          circular
          onClick={this.props.toggle}
          width='100' height='100'
        />
        <Modal
          open={this.props.open}
          closeIcon
          onClose={this.props.toggle}>
          <Header>Create a Monster</Header>

              <Form onSubmit={(e) =>
                this.props.create(e, this.state)}>
                  <Form.Input
                    fluid
                    name="name"
                    placeholder='Monster Name'
                    onChange={this.handleChange}
                  />
                  <Form.Group inline name="level">
                    <Form.Radio
                      key='1'
                      label="1"
                      name="level"
                      value="1"
                      checked={this.state.level === "1"}
                      onChange={this.handleRadioChange}
                    />
                    <Form.Radio
                      key='2'
                      label="2"
                      name="level"
                      value="2"
                      checked={this.state.level === "2"}
                      onChange={this.handleRadioChange}
                    />
                    <Form.Radio
                      key='3'
                      label="3"
                      name="level"
                      value="3"
                      checked={this.state.level === "3"}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Group>
                  <Form.Checkbox
                      key='boss'
                      label='Boss'
                      name='boss'
                      checked={this.state.boss === true}
                      onChange={this.toggleBoss}
                    />
                  <Dropdown
                    placeholder='Squares'
                    name="squares"
                    onChange={this.handleDropDown}

                    value={this.state.squares}
                    fluid multiple selection
                    options={squareOptions}
                  />
                  <Select
                    placeholder='Select Monsters xp'
                    name="xp"

                    options={options}
                  />
                  <Form.Button>Submit</Form.Button>
              </Form>

        </Modal>
      </React.Fragment>

    );
  }
}
export default CreateMonsterModal;
