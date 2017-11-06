import React, { Component } from 'react';
import '../static/css/App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import PostDetailsContainer from './PostDetailsContainer'
import { Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom';
import CreateEditPost from './CreateEditPost'
import { NoMatch } from './NoMatch'

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
        <Switch>
        <Route exact path="/" render={() =>
          <div className="container">
          <Row>
            <Col xs={9} md={9}>
              <PostList showPostDetails={false}/>
            </Col>
            <Col xs={3} md={3}><CategoryList /></Col>
          </Row>
          </div>
        }></Route>
        <Route exact path="/:category/posts" render={(route) =>
          <div className="container">
          <Row>
            <Col xs={9} md={9}>
              <PostList category = {route.match.params.category} showPostDetails={false}/>
            </Col>
            <Col xs={3} md={3}><CategoryList /></Col>
          </Row>
          </div>
        }></Route>
        <Route exact path="/posts/new" render={(route) =>
          <div className="container">
          <Row>
            <Col xs={9} md={9}>
              <CreateEditPost postId={route.match.params.postId}
                isEdit={false}
                onUpdatePost={() =>
                  route.history.goBack()
                }
              />
            </Col>
            <Col xs={3} md={3}><CategoryList /></Col>
          </Row>
          </div>
        }>
        </Route>
        <Route exact path="/posts/:postId" render={(route) =>
          <div className="container">
          <Row>
            <Col xs={9} md={9}>
              <PostDetailsContainer postId={route.match.params.postId} onAfterPostDelete={() =>
                  route.history.push('/')
                }/>
            </Col>
            <Col xs={3} md={3}><CategoryList /></Col>
          </Row>
          </div>
        }></Route>
        <Route exact path="/posts/:postId/edit" render={(route) =>
          <div className="container">
          <Row>
            <Col xs={9} md={9}>
              <CreateEditPost postId={route.match.params.postId}
                isEdit={true}
                onUpdatePost={() =>
                  route.history.goBack()
                }
              />
            </Col>
            <Col xs={3} md={3}><CategoryList /></Col>
          </Row>
          </div>
        }>
        </Route>
        <Route component={NoMatch}/>
        </Switch>
      </div>

    );
  }
}

export default App;
