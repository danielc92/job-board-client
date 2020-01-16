import React, { Component } from 'react'
import { Dimmer, Segment, Loader} from 'semantic-ui-react';

export default class ResusableLoader extends Component {
    render() {
        return (
            <Segment style={{height: '300px'}}>
                <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Segment>
        )
    }
}
