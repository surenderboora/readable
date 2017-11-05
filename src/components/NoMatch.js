import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';

export class NoMatch extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col xs={9} md={9}>
                        You seem to be lost. <Link to="/">Take me to home page</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}
