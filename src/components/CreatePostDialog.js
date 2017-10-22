import React, { Component } from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class CreatePostDialog extends Component {
  state = {
    show: false
  }

  showModal = () => {
    this.setState({show: true});
  }

  hideModal= () => {
    this.setState({show: false});
  }

  createPost = () => {

  }
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModal}>
          New Post
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="Title"
                placeholder="Post title"
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Body</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Post body" />
              </FormGroup>
              <FieldGroup
                id="formControlsPassword"
                label="Author"
                type="text"
                placeholder="Your name"
              />
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                </FormControl>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
            <Button onClick={(e) => this.createPost(e)} bsStyle="primary">Create</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}
export default CreatePostDialog;