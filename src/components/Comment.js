import React, { Component } from 'react';
import { voteOnComment, deleteComment } from '../apis/ReadableAPI'
import {
  upvoteComment,
  downvoteComment,
  removeComment
} from '../actionCreators/commentActionCreators'
import {connect} from 'react-redux'

class Comment extends Component {
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
  render() {
    const {comment} = this.props;
    // console.log("Comment props - ",  this.props);
    return (
      <div className="comment">
        <div className="media">
          <div className="col-md-11">
          <div className="author">
            {comment.author}
          </div>
          <div className="comment-body">
            <div>{comment.body}</div>
            <span className="anchor-time">{comment.createdOn}</span>
          </div>
          </div>
          <div className="col-md-1">
            <a href="#" onClick={(e) => this.onCommentDelete(e, comment)}>
              <i className="glyphicon glyphicon-trash"></i>
            </a>
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