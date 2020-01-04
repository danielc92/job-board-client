import React, { Component } from 'react'
import { Header, Segment, Divider } from 'semantic-ui-react';

export default class JobSeekerComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <Header as="h1" content="Your applications"/>
                <Divider/>
                <Segment stacked padded>
                    <p>This is only visible to job seekers</p>
                </Segment>
            </React.Fragment>
        )
    }
}
