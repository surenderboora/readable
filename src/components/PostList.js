import React, { Component } from 'react';
import {Panel, Table} from 'react-bootstrap';
import '../static/css/App.css'
import { dynamicSort, timestampToDate } from '../utils'
import PostDetails from './PostDetails'
import {getPosts} from '../apis/ReadableAPI'

class PostList extends Component {
    state = {
        'sortedOn': 'voteScore',
        'sortOrder': 'desc',
        'posts': []
    }
    componentDidMount = () => {
        const {category} = this.props;
        getPosts(category).then((data) => this.setState({posts: data}));
    }
    componentDidUpdate = (prevProps, prevState) => {
        const prevCategory = prevProps.category;
        const category = this.props.category;
        if(prevCategory !== category) {
            getPosts(category).then((data) => this.setState({posts: data}));
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
        let { sortOrder, sortedOn, posts } = this.state;
        let {showPostDetails} = this.props;
        posts = posts.sort(dynamicSort(sortedOn, sortOrder));
        posts.forEach((post) => {
            post['createdOn'] = timestampToDate(post['timestamp']);
        })
        const defaultSortOrder = 'desc';
        return (
            <div>
                {posts.map((post) => (
                <PostDetails post={post} showPostDetails={showPostDetails}/>
                ))}
            </div>
        );
    }
}
export default PostList;