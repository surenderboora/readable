import React, { Component } from 'react';
import {getPost, getPostComments} from '../apis/ReadableAPI'
import PostDetails from './PostDetails'
import {connect} from 'react-redux'
import * as postActions from '../actionCreators/postActionCreators'
import {listPostComments} from '../actionCreators/commentActionCreators'

class PostDetailsContainer extends Component {
    state = {
        isLoading: true
    }
    componentDidMount=() => {
        const postId = this.props.postId;
        getPost(postId)
            .then((data) => this.props.getPost(data))
            .then(() =>
                getPostComments(postId)
                    .then((data) => this.props.getPostComments(data))
            )
            .then(()=>this.setState({isLoading: false}))
    }
    componentDidUpdate = (prevProps, prevState) => {
        const prevPostId = prevProps.postId;
        const postId = this.props.postId;
        if(prevPostId !== postId) {
            getPost(postId)
                .then((data) => this.props.getPost(data));
            getPostComments(postId)
                .then((data) => this.props.getPostComments(data));
        }
    }
    render() {
        const {post} = this.props;
        const isLoading = this.state.isLoading;
        return (
            <div>
            {isLoading && (<div>Loading ...</div>)}
            {!isLoading &&
            (<PostDetails post={post} showPostDetails={true}/>)}
            </div>
        );
    }
}

function mapStateToProps({posts, comments}, ownProps) {
    const postId = ownProps.postId;
    let post = posts.find((p) => p.id == postId) || {}
    return {post: post}
}

function mapDispatchToProps(dispatch){
  return {
    // each property must be a function that dispatch an action (mostly via action creator).
    getPost: (data) => dispatch(postActions.getPost(data)),
    getPostComments: (data) => dispatch(listPostComments(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsContainer);