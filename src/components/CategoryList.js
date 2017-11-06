import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { getCategories } from '../apis/categories'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { listCategories } from '../actionCreators'

class CategoryList extends Component {
    componentDidMount = () => {
        getCategories()
            .then((data)=> { this.props.getCategories(data)});
    }
    render () {
        const title = (
            <h3>Categories</h3>
        );
        const {categories} = this.props;
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
function mapStateToProps({categories}) {
    return {
        categories: categories
    }
}
function mapDispatchToProps(dispatch){
  return {
    getCategories: (data) => dispatch(listCategories(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);