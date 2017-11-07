import React, { Component } from 'react';
import '../static/css/App.css'
import { dynamicSort } from '../utils'
import Post from './Post'
import { connect } from 'react-redux'
import { getPosts } from '../apis/posts'
import { listPosts } from '../actionCreators/postActionCreators'
import {Link} from 'react-router-dom'

const sortableFields = ['voteScore', 'timestamp'];
const sortableFieldLabels = ['Vote Score', 'Created Time'];
const sortOrders = ['desc', 'asc'];

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
            })
        let { sortOrder, sortedOn } = this.state;
        if (sortableFields.indexOf(sortedOn) < 0) {
            sortedOn = sortableFields[0];
            this.setState({
                sortedOn
            })
        }
        if (sortOrders.indexOf(sortOrder) < 0) {
            sortOrder = sortOrders[0];
            this.setState({
                sortOrder
            })
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const prevCategory = prevProps.category;
        const category = this.props.category;
        if(prevCategory !== category) {
            getPosts(category)
                .then((data) => this.props.getPosts(data))
        }
    }
    onSortClick = (e, sortedOn, sortOrder) => {
        e.preventDefault();
        let columnSortOrder = sortOrder;
        this.setState(() => ({
            sortedOn: sortedOn,
            sortOrder: columnSortOrder
        }));
    }
    render () {
        let { sortOrder, sortedOn } = this.state;
        let {posts} = this.props;
        posts = posts.sort(dynamicSort(sortedOn, sortOrder));
        let sortFields = sortableFields.map((field, index) => {
            let fieldObj = {
                value: field,
                label: sortableFieldLabels[index],
                classes: ['sortable'],
                nextSortOrder: 'desc'
            }
            if (field === sortedOn) {
                fieldObj.classes.push('active')
                fieldObj.classes.push(sortOrder)
                fieldObj.nextSortOrder = sortOrder === 'desc'? 'asc':'desc'
            }
            return fieldObj;
        })
        return (
            <div>
                <div className="post-list-header">
                    <div className="pull-left">
                    <h4 className="post-list-header-label">
                        Post List -
                    </h4>
                    </div>
                    <div className="sort-container pull-left">

                        <span>Sort By:</span>
                        {sortFields.map((field) =>
                            (
                            <span key={field.label}
                                className={field.classes.join(' ')}
                                onClick={(e) => this.onSortClick(e, field.value, field.nextSortOrder)}>{field.label}</span>
                            )
                        )}

                    </div>
                    <div className="post-list-header-button pull-right">
                        <Link to="/posts/new" className="btn btn-primary">Create Post</Link>
                    </div>
                    <div className="clearfix"/>
                </div>
                {posts.length === 0 && <div className="post-list-empty-container"> No Posts found. Go ahead and create one now.</div>}
                {posts.length > 0 && posts.map((post) => (
                <Post key={post.id} post={post}/>
                ))}
            </div>
        );
    }
}
function mapStateToProps({posts}){
    return {posts}
}
function mapDispatchToProps(dispatch){
    return {
        getPosts: (data) => dispatch(listPosts(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);