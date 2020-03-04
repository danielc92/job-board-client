import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
export default class TermsPage extends Component {
  render() {
    return (
      <Container>
        <VerticallyPaddedContainer size="3">
          <Header as="h1" content="Terms of use" />
          <p>There is nothing here yet...</p>
          <Header as="h3" content="Sub heading" />
          <p>There is nothing here yet.</p>
        </VerticallyPaddedContainer>
      </Container>
    )
  }
}
