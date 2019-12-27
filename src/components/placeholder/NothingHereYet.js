import React, { Component } from 'react'
import { Divider, Container, Segment, Header, Placeholder } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';

export default class NothingHereYet extends Component {

    render() {
        return (
            <div>
                <Segment  basic>
                <Container>
                    <VerticallyPaddedContainer size="4">
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
                    </VerticallyPaddedContainer>
                
                </Container>
                </Segment>
            </div>
        )
    }
}
