import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
class CategoryList extends Component {
    render () {
        const title = (
            <h3>Categories</h3>
        );
        const categories = ['react', 'redux', 'udacity'];
        return (
            <div>
                <Panel header={title}>
                    <ul>
                        {categories.map((category, index) => (
                        <li key={index}>
                            {category}
                        </li>
                        ))}
                    </ul>
                </Panel>
            </div>
        );
    }
}

export default CategoryList;