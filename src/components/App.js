import React, { Component } from 'react';
import '../static/css/App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import {Jumbotron, Row, Col} from 'react-bootstrap';

class App extends Component {
  render() {
  	const posts = [{
            id: 1,
            timestamp: 1507570662668,
            title: 'React 16 is out now!',
            body: 'React 16 is out now!',
            author: 'Surender',
            category: 'react',
            voteScore: 25,
            deleted: false
        },{
            id: 2,
            timestamp: 1507570362668,
            title: 'React 15 is out now!',
            body: 'React 15 is out now!',
            author: 'Surender',
            category: 'react',
            voteScore: 15,
            deleted: false
        },{
            id: 3,
            timestamp: 1507570342668,
            title: 'React 12 is out now!',
            body: 'React 12 is out now!',
            author: 'Surender',
            category: 'react',
            voteScore: 18,
            deleted: false
        }];
    return (
      <div className="App">
      	<div className="App-header">
      		<div className="App-intro">Readable Frontend</div>
      	</div>
      	<Jumbotron>
      	<Row>
	      	<Col xs={12} md={7} mdOffset={1}><PostList posts = {posts}/></Col>
	      	<Col xs={8} md={3}><CategoryList /></Col>
      	</Row>
      	</Jumbotron>
      </div>

    );
  }
}

export default App;
