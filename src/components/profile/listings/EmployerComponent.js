import React, { Component } from 'react'
import { Header, Segment, Divider } from 'semantic-ui-react';

export default class EmployerComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <Header as="h1" content="Your job postings"/>
                <Divider/>
                <Segment stacked padded>
                    <p>This is only visible to employers</p>
                </Segment>
            </React.Fragment>
        )
    }
}
