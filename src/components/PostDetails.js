import React, { Component } from 'react';
import Comment from './Comment';
import CreateCommentDialog from './CreateCommentDialog'
import { Link } from 'react-router-dom';
import { voteOnPost, deletePost } from '../apis/ReadableAPI';
import { connect } from 'react-redux';
import {
  upvotePost,
  downvotePost,
  removePost
} from '../actionCreators/postActionCreators';
import {dynamicSort} from '../utils'
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
    const {post, showPostDetails, postNotFound} = this.props;
    console.log("Post details props is ",  this.props);
    const { showCommentDialog } = this.state;
    if(!post || postNotFound === true) {
      return (
        <div>Request Post doesn't exist. Go to <Link to="/">Post List</Link> </div>
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
                  <a href="#" onClick={(e) => this.onPostDelete(e, post)}>
                    <i className="glyphicon glyphicon-trash"></i>
                  </a>
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
                  {!showPostDetails && (<li> {post.comments ? `${post.comments.length} Comments`: '0 Comments'} </li>)}
                  <li>
                    <a href="#" onClick={(e) => this.onPostDownvote(e, post)}>
                      <i className="glyphicon glyphicon-thumbs-down"></i>
                    </a>
                    <span className="ph4">{post.voteScore}</span>
                    <a href="#" onClick={(e) => this.onPostUpvote(e, post)}>
                      <i className="glyphicon glyphicon-thumbs-up"></i>
                    </a>
                  </li>
                  {
                    showPostDetails &&
                    (
                      <li>
                        <a href="#" onClick={(e)=> this.showCreateCommentModal(e)}>
                          <i className="glyphicon glyphicon-comment"></i>
                          Comment
                        </a>
                      </li>
                    )
                  }
                </ul>
              </div>
              {
                showPostDetails &&
                (<div className="post-footer-comment-wrapper">
                 <div className="comment-form">
                  <CreateCommentDialog
                    postId={post.id}
                    isEdit={false}
                    show={showCommentDialog}
                    showModal={this.showCreateCommentModal}
                    hideModal={this.hideCreateCommentModal}/>
                 </div>
                 {post.comments && post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                 ))}
                </div>)
              }
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
    return {post}
  }
  let post_comments = comments ? comments.filter((c) => c.parentId === postId) : [];
  post_comments.sort(dynamicSort('voteScore', 'desc'))
  post.comments = post_comments;
  return {post}
}

function mapDispatchToProps(dispatch){
  return {
    upvotePost: (data) => dispatch(upvotePost(data)),
    downvotePost: (data) => dispatch(downvotePost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);