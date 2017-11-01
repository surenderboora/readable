import React, { Component } from 'react';
import '../static/css/App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import PostDetailsContainer from './PostDetailsContainer'
import {Jumbotron, Row, Col} from 'react-bootstrap';
import CreatePostDialog from './CreatePostDialog'
import {Route, Link} from 'react-router-dom';
import CreateEditPost from './CreateEditPost'
class App extends Component {
  render() {
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
              {/*<CreatePostDialog className="pull-right"/>*/}
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
        <Route exact path="/posts/:postId/edit" render={(route) =>
          <Row>
            <Col xs={12} md={7} mdOffset={1}>
              <CreateEditPost postId={route.match.params.postId}
                isEdit={true}
                onUpdatePost={() =>
                  route.history.goBack()
                }
              />
            </Col>
            <Col xs={8} md={3}><CategoryList /></Col>
          </Row>
        }>
        </Route>
        <Route exact path="/newpost" render={(route) =>
          <Row>
            <Col xs={12} md={7} mdOffset={1}>
              <CreateEditPost postId={route.match.params.postId}
                isEdit={false}
                onUpdatePost={() =>
                  route.history.goBack()
                }
              />
            </Col>
            <Col xs={8} md={3}><CategoryList /></Col>
          </Row>
        }>
        </Route>
      </div>

    );
  }
}

export default App;
