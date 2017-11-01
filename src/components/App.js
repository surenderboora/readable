import React, { Component } from 'react';
import '../static/css/App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import PostDetailsContainer from './PostDetailsContainer'
import {Jumbotron, Row, Col} from 'react-bootstrap';
import CreatePostDialog from './CreatePostDialog'
import {Route, Link} from 'react-router-dom';
class App extends Component {
  render() {
    const posts = [{
            id: 1,
            timestamp: 1507470662668,
            title: 'React 16 is out now!',
            body: 'React 16 is out now!',
            author: 'Surender',
            category: 'react',
            voteScore: 25,
            deleted: false,
            comments:[{
              id: 1,
              parentId:1,  //String  id of the parent post
              timestamp: 1507470772668, // Integer Time created - default data tracks this in Unix time. You can use Date.now() to get this number
              body: "Great Article!! Keep Posting!!" ,//String  Comment body
              author: 'Charlie',  //String  Comment author
              voteScore: 4, //Integer Net votes the comment has received (default: 1)
              deleted: false, //Boolean Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
              parentDeleted: false //Boolean Flag for when the the parent post was deleted, but the comment itself was not.
            }, {
              id: 2,
              parentId: 1,  //String  id of the parent post
              timestamp: 1507470842668, // Integer Time created - default data tracks this in Unix time. You can use Date.now() to get this number
              body: "Great Article!!!" ,//String  Comment body
              author: 'Matt Damon',  //String  Comment author
              voteScore: 14, //Integer Net votes the comment has received (default: 1)
              deleted: false, //Boolean Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
              parentDeleted: false //Boolean Flag for when the the parent post was deleted, but the comment itself was not.
            }]
        },{
            id: 2,
            timestamp: 1503570362668,
            title: 'React 15 is out now!',
            body: 'React 15 is out now!',
            author: 'Surender',
            category: 'react',
            voteScore: 15,
            deleted: false
        },{
            id: 3,
            timestamp: 1504770342668,
            title: 'React 12 is out now!',
            body: 'React 12 is out now!',
            author: 'Surender',
            category: 'react',
            voteScore: 18,
            deleted: false
        },{
            id: 4,
            timestamp: 1501070342668,
            title: 'Redux is awesome!',
            body: 'Redux is awesome!',
            author: 'Surender',
            category: 'redux',
            voteScore: 22,
            deleted: false
        }];
    return (
      <div>
        <Route path="/" render={() =>
          <div className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <span className="navbar-brand">Readable</span>
              </div>
              <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
              </div>
            </div>
          </div>
        }></Route>
        <Route exact path="/" render={() =>
          <Row>
            <Col xs={12} md={7} mdOffset={1}>
              <PostList showPostDetails={false}/>
              <CreatePostDialog className="pull-right"/>
            </Col>
            <Col xs={8} md={3}><CategoryList /></Col>
          </Row>
        }></Route>
        <Route exact path="/:category/posts" render={(route) =>
          <Row>
            <Col xs={12} md={7} mdOffset={1}>
              <PostList category = {route.match.params.category} showPostDetails={false}/>
              {/* <CreatePostDialog className="pull-right" isEdit={false}/> */}
            </Col>
            <Col xs={8} md={3}><CategoryList /></Col>
          </Row>
        }></Route>
        <Route exact path="/posts/:postId" render={(route) =>
          <Row>
            <Col xs={12} md={7} mdOffset={1}>
              <PostDetailsContainer postId={route.match.params.postId}/>
              {/* <CreatePostDialog className="pull-right"/> */}
            </Col>
            <Col xs={8} md={3}><CategoryList /></Col>
          </Row>
        }></Route>
      </div>

    );
  }
}

export default App;
