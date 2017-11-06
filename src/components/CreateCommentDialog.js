import React, { Component } from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal } from 'react-bootstrap';
import { createComment } from '../apis/comments'
import * as CommentActions from '../actionCreators/commentActionCreators'
import { getUniqueId } from '../utils'
import { connect } from 'react-redux'
import {FieldGroup} from './FieldGroup'

class CreateCommentDialog extends Component {
  state = {
    comment: {
      id: '',
      timestamp: 0,
      body: '',
      author: '',
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
      parentId: ''
    }
  }
  createComment = () => {
    let comment = this.state.comment;
    comment.timestamp = Date.now();
    comment.id = getUniqueId();
    comment.parentId = this.props.postId;
    createComment(comment)
      .then((comment)=> this.props.createComment(comment))
      .then(() => this.props.hideModal());
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState((prevState) => {
      let newState = {
        comment: prevState.comment
      };
      newState.comment.title = title;
      return newState;
    });
  }
  onBodyChange = (e) => {
    const inputValue = e.target.value;
    this.setState((prevState) => {
      let newState = {
        comment: prevState.comment
      };
      newState.comment.body = inputValue;
      return newState;
    });
  }
  onAuthorChange = (e) => {
    const inputValue = e.target.value;
    this.setState((prevState) => {
      let newState = {
        comment: prevState.comment
      };
      newState.comment.author = inputValue;
      return newState;
    });
  }
  render() {
    const comment = this.state.comment;
    const isEdit = !!this.props.isEdit;
    const onBodyChange = this.onBodyChange,
      onAuthorChange = this.onAuthorChange;
    const { show, hideModal } = this.props;
    return (
      <ButtonToolbar>
        <Modal
          {...this.props}
          show={show}
          onHide={(e)=> hideModal(e)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{isEdit? 'Edit Comment':'Create New Comment'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Body</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Comment body"
                  value ={comment.body}
                  onChange={(e) => onBodyChange(e)}/>
              </FormGroup>
              <FieldGroup
                id="formControlsPassword"
                label="Author"
                type="text"
                placeholder="Your name"
                value ={comment.author}
                onChange={(e) => onAuthorChange(e)}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => hideModal(e)}>Close</Button>
            <Button onClick={(e) => this.createComment(e)} bsStyle="primary">Create</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}
function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    createComment: (comment) => dispatch(CommentActions.createComment(comment))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentDialog);
