import React, { Component } from 'react';
import { getPost } from '../apis/posts'
import { getPostComments } from '../apis/comments'
import PostDetails from './PostDetails'
import { connect } from 'react-redux'
import * as postActions from '../actionCreators/postActionCreators'
import { listPostComments } from '../actionCreators/commentActionCreators'

class PostDetailsContainer extends Component {
    state = {
        isLoading: true,
        postNotFound: false
    }
    componentDidMount=() => {
        const postId = this.props.postId;
        getPost(postId)
            .then((data) => {
                if (!data) {
                    this.setState({
                        isLoading: false,
                        postNotFound:true
                    })
                } else {
                    this.props.getPost(data);
                    getPostComments(postId)
                        .then((data) => this.props.getPostComments(data, postId))
                        .then(()=>this.setState({isLoading: false, postNotFound: false}))
                    }
                }
            )
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    postNotFound:true
                })
            })
    }
    componentDidUpdate = (prevProps, prevState) => {
        const prevPostId = prevProps.postId;
        const postId = this.props.postId;
        if(prevPostId !== postId) {
            getPost(postId)
                .then((data) => this.props.getPost(data));
            getPostComments(postId)
                .then((data) => this.props.getPostComments(data, postId));
        }
    }
    render() {
        const {post, onAfterPostDelete} = this.props;
        const { isLoading, postNotFound } = this.state;

        return (
            <div>
            {isLoading && (<div>Loading ...</div>)}
            {!isLoading &&
            (<PostDetails post={post} postNotFound={postNotFound} onAfterPostDelete={onAfterPostDelete}/>)}
            </div>
        );
    }
}

function mapStateToProps({posts, comments}, ownProps) {
    const postId = ownProps.postId;
    let post = posts.find((p) => p.id === postId) || {}
    return {post: post}
}

function mapDispatchToProps(dispatch){
  return {
    // each property must be a function that dispatch an action (mostly via action creator).
    getPost: (data) => dispatch(postActions.getPost(data)),
    getPostComments: (comments, postId) => dispatch(listPostComments(comments, postId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsContainer);