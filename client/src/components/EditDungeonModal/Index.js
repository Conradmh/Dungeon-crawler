import React from 'react';

function EditDungeonModal (props){

  return (
    <React.Fragment>
      <Modal open={props.open} closeIcon onClose={props.closeModal}>
        <Header>Edit Dungeon</Header>
          <Modal.Content>
            <Form onSubmit={props.updateDungeon}>
            <Label> Name: </Label>
            <Form.Input
              type="text"
              name="name"
              value={props.dungeonToEdit.name}
              onChange={props.handleEditChange}
            />
            <Dropdown
              placeholder='Monsters'
              name="monsters"
              onChange={this.handleDropDown}
              fluid multiple selection
              options={monsterOptions}
            />
            <Select
              placeholder='Select Dungeon Difficulty'
              name="difficulty"
              onChange={this.handleDropDown}
              options={options}
            />

            <Modal.Actions>
              <Button color='blue' type="submit">Update Dungeon</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>

    </React.Fragment>
  );
}
export default EditDungeonModal;
