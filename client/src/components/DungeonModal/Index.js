import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class DungeonModal extends Component {
  
  render(){
    return (
      <Modal
        open={this.props.open}
        closeIcon
        onClose={this.props.toggle}>

        <h1> Dungeon Modal </h1>
        { this.props.currentDungeonIndex !== undefined && this.props.render }
      </Modal>

    );
  }
}
export default DungeonModal;
