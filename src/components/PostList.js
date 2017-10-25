import React, { Component } from 'react';
import {Panel, Table} from 'react-bootstrap';
import '../static/css/App.css'
import { dynamicSort, timestampToDate } from '../utils'
import PostDetails from './PostDetails'
import { connect } from 'react-redux'
import { getPosts, getPostComments } from '../apis/ReadableAPI'
import { listPosts } from '../actionCreators/postActionCreators'
import { listPostComments } from '../actionCreators/commentActionCreators'
class PostList extends Component {
    state = {
        'sortedOn': 'voteScore',
        'sortOrder': 'desc'
    }
    componentDidMount = () => {
        const {category} = this.props;
        getPosts(category)
            .then((posts) => {
                this.props.getPosts(posts)
                return posts
            })
            .then((posts) => {
                if (posts && posts.length > 0) {
                    posts.map((post) =>
                        getPostComments(post.id).then((post) =>
                            this.props.getPostComments(post)
                        )
                    )
                }
            });
    }
    componentDidUpdate = (prevProps, prevState) => {
        const prevCategory = prevProps.category;
        const category = this.props.category;
        if(prevCategory !== category) {
            getPosts(category)
                .then((data) => this.props.getPosts(data))
                .then((posts) => {
                    if (posts && posts.length > 0) {
                        posts.map((post) =>
                            getPostComments(post.id).then((post) =>
                                this.props.getPostComments(post)
                            )
                        )
                    }
                });
        }
    }
    onSortClick = (sortedOn, sortOrder) => {
        let columnSortOrder = sortOrder === 'asc' ? 'desc': 'asc';
        this.setState(() => ({
            sortedOn: sortedOn,
            sortOrder: columnSortOrder
        }));
    }
    render () {
        let { sortOrder, sortedOn } = this.state;
        let {posts} = this.props;
        let {showPostDetails} = this.props;
        console.log("PostList props are : ", this.props)
        posts = posts.sort(dynamicSort(sortedOn, sortOrder));
        const {comments} = this.props;
        posts.forEach((post) => {
            post['createdOn'] = timestampToDate(post['timestamp']);
            post.comments = comments.filter((c) => c.parentId == post.id);
        })
        const defaultSortOrder = 'desc';
        return (
            <div>
                {posts.map((post) => (
                <PostDetails key={post.id} post={post} showPostDetails={showPostDetails}/>
                ))}
            </div>
        );
    }
}
function mapStateToProps({posts, comments}){
    return {posts, comments}
}
function mapDispatchToProps(dispatch){
    return {
        getPosts: (data) => dispatch(listPosts(data)),
        getPostComments: (comments) => (listPostComments(comments))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);