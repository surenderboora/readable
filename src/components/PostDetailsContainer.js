import React, { Component } from 'react';
import {getPost, getPostComments} from '../apis/ReadableAPI'
import PostDetails from './PostDetails'
class PostDetailsContainer extends Component {
	state = {
		post: {},
	}
	componentDidMount=() => {
		const postId = this.props.postId;
		getPost(postId)
			.then((data) => this.setState({post: data}))
		getPostComments(postId)
			.then((data) => this.setState({comments: data}));
	}
	componentDidUpdate = (prevProps, prevState) => {
        const prevPostId = prevProps.postId;
        const postId = this.props.postId;
        if(prevPostId !== postId) {
            getPost(postId)
            	.then((data) => this.setState({post: data}));
            getPostComments(postId)
				.then((data) => this.setState({comments: data}));
        }
    }
	render() {
		let { post } = this.state;
		post.comments = this.state.comments;
		return (
			<PostDetails post={post} showPostDetails={true}/>
		);
	}
}

export default PostDetailsContainer;