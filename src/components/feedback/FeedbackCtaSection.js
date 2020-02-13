import React, { Component } from 'react'
import { Segment, Container, Button, Header, Icon } from 'semantic-ui-react'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

export default class FeedbackCtaSection extends Component {
  render() {
    return (
      <Segment
        basic
        inverted
        color="green"
        style={{ margin: 0 }}
        textAlign="center"
      >
        <Container>
          <VerticallyPaddedContainer size="4">
            <Header
              inverted
              as="h1"
              content="Your feedback is always welcome"
            />
            <p>
              Anytime of the day your feedback is 100% welcome. We strive to
              improve our platform based on user feedback.
            </p>
            <Button inverted size="large">
              <Icon name="star"></Icon>
              Provide feedback
            </Button>
          </VerticallyPaddedContainer>
        </Container>
      </Segment>
    )
  }
}