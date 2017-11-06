import React, { Component } from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal } from 'react-bootstrap';
import { updateComment } from '../apis/comments'
import * as CommentActions from '../actionCreators/commentActionCreators'
import { getUniqueId } from '../utils'
import { connect } from 'react-redux'
import {FieldGroup} from './FieldGroup'

class EditCommentDialog extends Component {
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
  componentWillMount () {
    const {comment} = this.props;
    this.setState({
      comment: {...comment}
    })
  }
  updateComment = () => {
    let comment = this.state.comment;
    console.log("comment in edit dialog", comment);
    updateComment(comment)
      .then((comment)=> this.props.updateComment(comment))
      .then(() => this.props.hideModal());
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
  render() {
    const isEdit = !!this.props.isEdit;
    let comment = isEdit? this.props.comment: this.state.comment;
    const onBodyChange = this.onBodyChange;
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
            <Modal.Title id="contained-modal-title-lg">Edit Comment</Modal.Title>
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => hideModal(e)}>Close</Button>
            <Button onClick={(e) => this.updateComment(e)} bsStyle="primary">Update</Button>
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
    updateComment: (comment) => dispatch(CommentActions.updateComment(comment))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCommentDialog);
