import React, { Component } from 'react';
import {getPost, getPostComments} from '../apis/ReadableAPI'
import PostDetails from './PostDetails'
import {connect} from 'react-redux'
import * as postActions from '../actionCreators/postActionCreators'
import {listPostComments} from '../actionCreators/commentActionCreators'

class PostDetailsContainer extends Component {

	componentDidMount=() => {
		const postId = this.props.postId;
		getPost(postId)
			.then((data) => this.props.getPost(data))
            .then(() =>
                getPostComments(postId)
                    .then((data) => this.props.getPostComments(data))
            )
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
        console.log("PostDetailsContainer props: ", this.props);
        const postId = this.props.postId;
		let post = this.props.posts.filter((p) => p.id == postId)[0] || {}
		post.comments = this.props.comments.filter((c) => c.parentId == postId);
		return (
			<PostDetails post={post} showPostDetails={true}/>
		);
	}
}

function mapStateToProps({posts, comments}) {
    return {posts: posts, comments: comments}
}
function mapDispatchToProps(dispatch){
  return {
    // each property must be a function that dispatch an action (mostly via action creator).
    getPost: (data) => dispatch(postActions.getPost(data)),
    getPostComments: (data) => dispatch(listPostComments(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsContainer);