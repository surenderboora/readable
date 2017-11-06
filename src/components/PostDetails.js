import React, { Component } from 'react';
import Comment from './Comment';
import CreateCommentDialog from './CreateCommentDialog'
import { Link } from 'react-router-dom';
import { voteOnPost, deletePost } from '../apis/posts';
import { connect } from 'react-redux';
import {
  upvotePost,
  downvotePost,
  removePost
} from '../actionCreators/postActionCreators';

class PostDetails extends Component {
  state = {
    showCommentDialog : false
  }
  onPostUpvote = (e, post) => {
    e.preventDefault();
    voteOnPost(post.id, 'upVote').then(post => this.props.upvotePost(post));
  }
  onPostDownvote = (e, post) => {
    e.preventDefault();
    voteOnPost(post.id, 'downVote').then(post => this.props.downvotePost(post));
  }
  onPostDelete = (e, post) => {
    e.preventDefault();
    deletePost(post.id)
      .then((post)=> this.props.removePost(post.id))
      .then(() => {
        if (this.props.onAfterPostDelete) {
          this.props.onAfterPostDelete()
        }
      });
  }
  showCreateCommentModal = (e) => {
    e.preventDefault();
    this.setState({showCommentDialog: true});
  }
  hideCreateCommentModal= (e) => {
    e && e.preventDefault();
    this.setState({showCommentDialog: false});
  }
  render() {
    const {post, comments, postNotFound} = this.props;
    console.log("Post details props is ",  this.props);
    const { showCommentDialog } = this.state;
    if(!post || postNotFound === true) {
      return (
        <div>Requested Post doesn't exist. Go to <Link to="/">Post List</Link> </div>
        )
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <section className="post-heading">
            <div className="row">
              <div className="col-md-10">
                <div className="media">
                  <div className="media-body">
                    <Link to={`/posts/${post.id}`} className="anchor-username">
                      <h4 className="media-heading">{post.title}</h4>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="pull-right">
                  <button className="btn btn-link" onClick={(e) => this.onPostDelete(e, post)}>
                    <i className="glyphicon glyphicon-trash"></i>
                  </button>
                  <span className="ph4">|</span>
                  <Link to={`/posts/${post.id}/edit`}>
                    <i className="glyphicon glyphicon-edit"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="post-body">
            <p>{post.body}</p>
          </section>
          <section className="post-footer">
            <span className="anchor-time">Posted on {post.createdOn} by {post.author}</span>
              <hr />
              <div className="post-footer-option container">
                <ul className="list-unstyled">
                  <li>
                    <button className="btn btn-link" onClick={(e) => this.onPostDownvote(e, post)}>
                      <i className="glyphicon glyphicon-thumbs-down"></i>
                    </button>
                    <span className="ph4">{post.voteScore}</span>
                    <button className="btn btn-link" onClick={(e) => this.onPostUpvote(e, post)}>
                      <i className="glyphicon glyphicon-thumbs-up"></i>
                    </button>
                  </li>

                  <li>
                    <button className="btn btn-link" onClick={(e)=> this.showCreateCommentModal(e)}>
                      <i className="glyphicon glyphicon-comment"></i>
                      Comment
                    </button>
                  </li>

                </ul>
              </div>
              <div className="post-footer-comment-wrapper">
                 <div className="comment-form">
                  <CreateCommentDialog
                    postId={post.id}
                    isEdit={false}
                    show={showCommentDialog}
                    showModal={this.showCreateCommentModal}
                    hideModal={this.hideCreateCommentModal}/>
                 </div>
                 {comments && comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                 ))}
              </div>
           </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps({posts, comments}, ownProps) {
  const postId = ownProps.post.id;
  let post = posts.find((p) => p.id === postId);
  if (!post) {
    return {post, comments: []}
  }
  return {post, comments}
}

function mapDispatchToProps(dispatch){
  return {
    upvotePost: (data) => dispatch(upvotePost(data)),
    downvotePost: (data) => dispatch(downvotePost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);