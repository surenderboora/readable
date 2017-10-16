import React, { Component } from 'react';
import {Panel, Table} from 'react-bootstrap';
import '../static/css/App.css'
import { dynamicSort, timestampToDate } from '../utils'
class PostList extends Component {
    state = {
        'sortedOn': 'voteScore',
        'sortOrder': 'desc'
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
            <h3>Posts</h3>
        );
        const { sortOrder, sortedOn } = this.state;
        let {posts} = this.props;
        posts = posts.sort(dynamicSort(sortedOn, sortOrder));
        posts.forEach((post) => {
            post['createdOn'] = timestampToDate(post['timestamp']);
        })
        const tableColumns = [{'id': 'title', 'title': 'Title', 'isSortable': false, 'classes': 'col-lg-8 col-md-7 col-sm-6 col-xs-6'},
                            {'id': 'voteScore', 'title': 'Vote Score', 'isSortable': true, 'classes': 'col-lg-2 col-md-3 col-sm-3 col-xs-3'},
                            {'id': 'timestamp', 'displayProperty': 'createdOn', 'title': 'Created On', 'isSortable': true, 'classes': 'col-lg-2 col-md-2 col-sm-3 col-xs-3'}];
        const defaultSortOrder = 'desc';

        return (
            <div>
                <Panel header={title}>
                    <Table responsive>
                        <thead>
                            <tr>
                                {tableColumns.map(column => {
                                    let classes = [column.classes];
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
                                                onClick={()=> column.isSortable && this.onSortClick(column.id, columnSortOrder)}>{column.title}</th>);
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                            <tr key={post.id}>
                                {tableColumns.map(column => {
                                    const key = `${post.id}-${column.id}`
                                    return (<td key={key} className={column.classes}>
                                        {column.displayProperty? post[column.displayProperty]: post[column.id]}
                                    </td>)
                                    })}
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