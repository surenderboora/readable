import React, { Component } from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal } from 'react-bootstrap';
import { createPost } from '../apis/ReadableAPI'
import * as PostActions from '../actionCreators/postActionCreators'
import { getUniqueId } from '../utils'
import { connect } from 'react-redux'
import {FieldGroup} from './FieldGroup'

const ERROR_CONSTANTS = {
  POST_TITLE_IS_EMPTY: "Post title cannot be empty.",
  POST_BODY_IS_EMPTY: "Post body cannot be empty.",
  AUTHOR_IS_EMPTY: "Author cannot be empty.",
  CATEGORY_NOT_SELECTED: "Please specify a category."
}

class CreatePostDialog extends Component {
  state = {
    show: false,
    titleHelp:"",
    bodyHelp:"",
    authorHelp: "",
    categoryHelp: "",
    post: {
      id: '',
      timestamp: 0,
      title: '',
      body: '',
      author: '',
      category: '',
      voteScore: 1,
      deleted: false
    }
  }

  showModal = () => {
    this.setState({show: true});
  }

  hideModal= () => {
    this.setState({show: false});
  }

  validatePost = (post) => {
    post.title = post.title.trim();
    post.body = post.body.trim();
    post.author = post.author.trim();
    post.category = post.category.trim();
    let isValid = true;
    if(!post.title){
      isValid = false;
      this.setState({
        titleHelp: ERROR_CONSTANTS.POST_TITLE_IS_EMPTY
      })
    }
    if(!post.body){
      isValid = false;
      this.setState({
        bodyHelp: ERROR_CONSTANTS.POST_BODY_IS_EMPTY
      })
    }
    if(!post.author){
      isValid = false;
      this.setState({
        authorHelp: ERROR_CONSTANTS.AUTHOR_IS_EMPTY
      })
    }
    if(!post.category){
      isValid = false;
      this.setState({
        categoryHelp: ERROR_CONSTANTS.CATEGORY_NOT_SELECTED
      })
    }
    return isValid;
  }
  createPost = () => {
    let post = this.state.post;
    post.timestamp = Date.now();
    post.id = getUniqueId();
    if(this.validatePost(post)) {
      createPost(post)
        .then((post)=> this.props.createPost(post))
        .then(() => this.hideModal());
    }
  }
  onTitleChange = (e) => {
    const inputValue = e.target.value;
    const isValid = inputValue !== '';
    this.setState((prevState) => {
      let newState = {
        post: prevState.post
      };
      newState.post.title = inputValue;
      let titleHelp = isValid ? "": ERROR_CONSTANTS.POST_TITLE_IS_EMPTY;
      return {...newState, titleHelp};
    });
  }
  onBodyChange = (e) => {
    const inputValue = e.target.value;
    const isValid = inputValue !== '';
    this.setState((prevState) => {
      let newState = {
        post: prevState.post
      };
      newState.post.body = inputValue;
      let bodyHelp = isValid ? "": ERROR_CONSTANTS.POST_BODY_IS_EMPTY;
      return {...newState, bodyHelp};
    });
  }
  onAuthorChange = (e) => {
    const inputValue = e.target.value;
    const isValid = inputValue !== '';
    this.setState((prevState) => {
      let newState = {
        post: prevState.post
      };
      newState.post.author = inputValue;
      let authorHelp = isValid ? "": ERROR_CONSTANTS.AUTHOR_IS_EMPTY;
      return {...newState, authorHelp};
    });
  }
  onCategoryChange = (e) => {
    const inputValue = e.target.value;
    const isValid = inputValue !== '';
    this.setState((prevState) => {
      let newState = {
        post: prevState.post
      };
      newState.post.category = inputValue;
      let categoryHelp = isValid ? "": ERROR_CONSTANTS.CATEGORY_NOT_SELECTED;
      return {...newState, categoryHelp};
    });
  }
  render() {
    const post = this.state.post;
    const onTitleChange = this.onTitleChange, onBodyChange = this.onBodyChange, onAuthorChange = this.onAuthorChange, onCategoryChange = this.onCategoryChange;
    const categories = this.props.categories;
    const { titleHelp, bodyHelp, authorHelp, categoryHelp } = this.state;
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
                value = {post.title}
                help={titleHelp}
                onChange={(e) => onTitleChange(e)}
              />
              <FieldGroup
                id="formControlsTextarea"
                type="textarea"
                label="Body"
                placeholder="Post body"
                value = {post.body}
                help={bodyHelp}
                onChange={(e) => onBodyChange(e)}
                componentClass="textarea"
              />
              <FieldGroup
                id="formControlsPassword"
                label="Author"
                type="text"
                placeholder="Your name"
                value ={post.author}
                help={authorHelp}
                onChange={(e) => onAuthorChange(e)}
              />
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={post.category.name}
                  onChange={(e) => onCategoryChange(e)}>
                  <option value=''>Select Category</option>
                  {categories.map((category) =>
                    <option value={category.id}>{category.name}</option>
                    )}
                </FormControl>
                {categoryHelp && <HelpBlock className="has-error">{categoryHelp}</HelpBlock>}
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
function mapStateToProps({categories}) {
  return {categories}
}
function mapDispatchToProps(dispatch) {
  return {
    createPost: (post) => dispatch(PostActions.createPost(post))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostDialog);