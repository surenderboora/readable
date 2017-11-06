import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal } from 'react-bootstrap';
import {FieldGroup} from './FieldGroup'
import {Link} from 'react-router-dom'
import { createPost, updatePost } from '../apis/posts'
import * as PostActions from '../actionCreators/postActionCreators'
import {getUniqueId} from '../utils'
const ERROR_CONSTANTS = {
  POST_TITLE_IS_EMPTY: "Post title cannot be empty.",
  POST_BODY_IS_EMPTY: "Post body cannot be empty.",
  AUTHOR_IS_EMPTY: "Author cannot be empty.",
  CATEGORY_NOT_SELECTED: "Please specify a category."
}

class CreateEditPost extends Component {
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
    },
    isLoading: true
  }
  componentDidMount = () => {
    const {isEdit} = this.props;
    if (!isEdit) {
      this.setState(()=> ({
        isLoading: false
      }))
      return;
    }
    const {post} = this.props;
    this.setState(()=> ({
      post: { ...post },
      isLoading: false
    }))
  }
  updatePost = () => {
    let { post } = this.state;
    if(this.validatePost(post)) {
      updatePost(post)
        .then((post)=> this.props.updatePost(post))
        .then(()=> this.props.onUpdatePost())
    }
  }
  createPost = () => {
    let post = this.state.post;
    post.timestamp = Date.now();
    post.id = getUniqueId();
    if (this.validatePost(post)) {
      createPost(post)
        .then((post)=> this.props.createPost(post))
        .then(()=> this.props.onUpdatePost())
    }
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
    const {post} = this.state;
    const onTitleChange = this.onTitleChange, onBodyChange = this.onBodyChange, onAuthorChange = this.onAuthorChange, onCategoryChange = this.onCategoryChange;
    const categories = this.props.categories;
    const { titleHelp, bodyHelp, authorHelp, categoryHelp, isLoading } = this.state;
    // console.log("Edit post props ", this.props)
    const {isEdit} = this.props;
    if (isLoading) {
      return (<div>Loading ... </div>);
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-lg">{isEdit? 'Edit' : 'Create'} Post</Modal.Title>
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
                value={post.category}
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
          <Link to="/" className="btn btn-default">Cancel</Link>
          {isEdit && <Button onClick={(e) => this.updatePost(e)} bsStyle="primary">Update</Button>}
          {!isEdit && <Button onClick={(e) => this.createPost(e)} bsStyle="primary">Create</Button>}
        </Modal.Footer>
        </div>
      </div>
    );
  }
}
function mapStateToProps({posts, categories}, ownProps) {
  const postId = ownProps.postId;
  const post = posts.find((p) => p.id == postId);
  return {post, categories}
}
function mapDispatchToProps(dispatch) {
  return {
    createPost: (data) => dispatch(PostActions.createPost(data)),
    updatePost: (data) => dispatch(PostActions.updatePost(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);