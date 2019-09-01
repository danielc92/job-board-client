import React, { Component } from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';


export default class ReactJobPostContainer extends Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Post a job</Header>
                    <p>Note you must be logged in to create a job post.</p>
                </Segment>
            </Container>
        )
    }
}
