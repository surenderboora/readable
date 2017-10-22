import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import {getCategories} from '../apis/ReadableAPI'
import {Link} from 'react-router-dom';
class CategoryList extends Component {
    state = {
        categories: []
    }
    componentDidMount =()=>{
        getCategories().then((data) => this.setState({categories: data}));
    }
    render () {
        const title = (
            <h3>Categories</h3>
        );
        const {categories} = this.state;
        return (
            <div>
                <Panel header={title}>
                    <ul>
                        {categories.map((category, index) => (
                        <li key={index}>
                            <Link to={`/${category.path}/posts`}> {category.name}</Link>
                        </li>
                        ))}
                    </ul>
                </Panel>
            </div>
        );
    }
}

export default CategoryList;