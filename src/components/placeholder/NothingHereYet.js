import React, { Component } from 'react'
import { Divider, Container, Segment, Header, Placeholder } from 'semantic-ui-react';

export default class NothingHereYet extends Component {

    render() {
        return (
            <div>
                <Segment style={{padding: '7rem 0rem'}}>
                <Container>
                <Header as="h1">Nothing here yet</Header>
                <Divider/>
                <Placeholder>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                <Placeholder>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                </Container>
                </Segment>
            </div>
        )
    }
}
