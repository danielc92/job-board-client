import React, { Component } from 'react'
import { Header, Divider, Segment, Form, Input } from 'semantic-ui-react';

export default class Seeker extends Component {
    render() {
        return (
            <React.Fragment>
                <Header as="h3" content="Career summary"/>
                <Segment stacked padded color="green">
                    <Input
                    value="I am here now come come come"
                    placeholder="placeholder"
                    fluid>
                    </Input>
                </Segment>

                <Header as="h3" content="Work Experience"/>
                <Segment.Group stacked padded color="green">
                    <Segment>Hello world</Segment>
                    <Segment>Hello world</Segment>
                </Segment.Group>

                <Header as="h3" content="Education"/>
                <Segment stacked padded color="green">
                </Segment>

                <Header as="h3" content="Skills & Achievements"/>
                <Segment stacked padded color="green">
                </Segment>

                <Header as="h3" content="Availability & Phone"/>
                <Segment stacked padded color="green">
                </Segment>

            </React.Fragment>
)
    }
}
