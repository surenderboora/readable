import React, { Component } from 'react';
import {Panel, Table} from 'react-bootstrap';
import '../static/css/App.css'
import { dynamicSort } from '../utils'
class PostList extends Component {
    state = {
        'sortedOn': 'title',
        'sortOrder': 'asc'
    }
    onSortClick = (sortedOn, sortOrder) => {
        let columnSortOrder = sortOrder === 'asc' ? 'desc': 'asc';
        this.setState(() => ({
            sortedOn: sortedOn,
            sortOrder: columnSortOrder
        }));
    }
    render () {
        const title = (
            <h3>Posts (Ordered by voteScore, highest first)</h3>
        );
        const { sortOrder, sortedOn } = this.state;
        let {posts} = this.props;
        posts = posts.sort(dynamicSort(sortedOn, sortOrder));
        const tableColumns = [{'id': 'title', 'title': 'Title', 'isSortable': true},
                            {'id': 'voteScore', 'title': 'Vote Score', 'isSortable': true}];
        const defaultSortOrder = 'desc';

        return (
            <div>
                <Panel header={title}>
                    <Table responsive>
                        <thead>
                            <tr>
                                {tableColumns.map(column => {
                                    let classes = [];
                                    let columnSortOrder = defaultSortOrder;
                                    if (column.isSortable) {
                                        classes.push('sortable');
                                        if(column.id === sortedOn)
                                            classes.push(sortOrder)
                                        else
                                            classes.push(defaultSortOrder)
                                        if (column.id === sortedOn){
                                            columnSortOrder = sortOrder;
                                            classes.push('active');
                                        }
                                    }

                                    return (<th
                                                key={column.id}
                                                className= {classes.join(' ')}
                                                onClick={()=> this.onSortClick(column.id, columnSortOrder)}>{column.title}</th>);
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                            <tr key={post.id}>
                                <td>
                                    {post.title}
                                </td>
                                <td>
                                    {post.voteScore}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                </Table>
                </Panel>
            </div>
        );
    }
}

export default PostList;