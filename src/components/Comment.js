import React, { Component } from 'react';
import { voteOnComment, deleteComment } from '../apis/ReadableAPI'
import {
  upvoteComment,
  downvoteComment,
  removeComment
} from '../actionCreators/commentActionCreators'
import {connect} from 'react-redux'
import EditCommentDialog from './EditCommentDialog'

class Comment extends Component {
  state = {
    isEditing: false
  }
  onCommentUpvote = (e, comment) => {
    e.preventDefault();
    voteOnComment(comment.id, 'upVote')
      .then((data) => this.props.upvoteComment(data));
  }
  onCommentDownvote = (e, comment) => {
    e.preventDefault();
    voteOnComment(comment.id, 'downVote')
      .then((data) => this.props.downvoteComment(data));
  }
  onCommentDelete = (e, comment) => {
    e.preventDefault();
    deleteComment(comment.id)
      .then((comment) => this.props.deleteComment(comment.id, comment.parentId));
  }
  onCommentEdit = (e, comment) => {
    e.preventDefault();
    this.setState({isEditing: true})
  }
  hideCommentEditDialog = () => {
    this.setState({isEditing: false})
  }
  render() {
    const {comment} = this.props;
    const {isEditing} = this.state;
    // console.log("Comment props - ",  this.props);
    return (
      <div className="comment">
        <div className="row">
          <div className="col-md-10">
          <div className="author">
            {comment.author}
          </div>
          <div className="comment-body">
            <div>{comment.body}</div>
            <span className="anchor-time">{comment.createdOn}</span>
          </div>
          </div>
          <div className="col-md-2">
            <div className="pull-right">
            <a href="#" onClick={(e) => this.onCommentDelete(e, comment)}>
              <i className="glyphicon glyphicon-trash"></i>
            </a>
            <span className="ph4">|</span>
            <a href="#" onClick={(e) => this.onCommentEdit(e, comment)}>
              <i className="glyphicon glyphicon-edit"></i>
            </a>
            </div>
            {isEditing && <EditCommentDialog comment={comment} show={true} hideModal={this.hideCommentEditDialog}/>}
          </div>
        </div>
        <section className="comment-footer">
          <div>
            <ul className="list-unstyled">
              <li>
                <a href="#" onClick={(e) => this.onCommentDownvote(e, comment)}>
                  <i className="glyphicon glyphicon-thumbs-down"></i>&nbsp;
                </a>
                  {comment.voteScore}
                <a href="#" onClick={(e) => this.onCommentUpvote(e, comment)}>
                  &nbsp;<i className="glyphicon glyphicon-thumbs-up"></i>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}
function mapStateToProps({comments}, ownProps) {
  const { comment } = ownProps;
  const updatedComment = comments.find((c) => c.id == comment.id);
  return {
    comment: updatedComment
  }
}
function mapDispatchToProps(dispatch){
  return {
    // each property must be a function that dispatch an action (mostly via action creator).
    upvoteComment: (data) => dispatch(upvoteComment(data)),
    downvoteComment: (data) => dispatch(downvoteComment(data)),
    deleteComment: (commentId, postId) => dispatch(removeComment(commentId, postId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);