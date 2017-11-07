import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { voteOnPost, deletePost } from '../apis/posts';
import { connect } from 'react-redux';
import {
  upvotePost,
  downvotePost,
  removePost
} from '../actionCreators/postActionCreators';

class Post extends Component {
  state = { }
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
  render() {
    const { post } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <section className="post-heading">
            <div className="row">
              <div className="col-md-10">
                <div className="media">
                  <div className="media-body">
                    <Link to={`/${post.category}/${post.id}`} className="anchor-username">
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
                  <button className="btn btn-link">
                    <Link to={`/${post.category}/${post.id}/edit`}>
                      <i className="glyphicon glyphicon-edit"></i>
                    </Link>
                  </button>
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
                  <li> {post.commentCount} Comments</li>
                  <li>
                    <button className="btn btn-link" onClick={(e) => this.onPostDownvote(e, post)}>
                      <i className="glyphicon glyphicon-thumbs-down"></i>
                    </button>
                    <span className="ph4">{post.voteScore}</span>
                    <button className="btn btn-link" onClick={(e) => this.onPostUpvote(e, post)}>
                      <i className="glyphicon glyphicon-thumbs-up"></i>
                    </button>
                  </li>
                </ul>
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
  return {post}
}

function mapDispatchToProps(dispatch){
  return {
    upvotePost: (data) => dispatch(upvotePost(data)),
    downvotePost: (data) => dispatch(downvotePost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);