import React, { Component } from 'react'
import { Message, Container, Segment } from 'semantic-ui-react';

export default class NothingHereYet extends Component {
    render() {
        return (
            <div>
                <Segment>
                <Container>
                    <Message
                    header="Nothing here yet"
                    color="yellow"
                    content="This page is under development. Please try again another time."
                    >
                    </Message>
                </Container>
                </Segment>
            </div>
        )
    }
}
