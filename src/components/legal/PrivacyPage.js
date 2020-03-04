import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'

export default class PrivacyPage extends Component {
  render() {
    return (
      <Container>
        <VerticallyPaddedContainer size="3">
          <Header as="h1" content="Privacy Page" />
          <p>
            Proident ipsum amet eu ut magna ex reprehenderit excepteur nisi
            dolore anim veniam commodo id. Sit excepteur ex ad elit consectetur
            elit elit aliqua excepteur nulla excepteur in. Fugiat in consectetur
            amet aliqua ullamco ea elit ex tempor non. Aliqua Lorem et aliquip
            quis quis. Quis ipsum laboris eiusmod laboris qui quis labore culpa
            cupidatat nisi Lorem non. Pariatur eu eiusmod magna mollit commodo
            consequat irure laboris. Ad pariatur ipsum enim ullamco laborum.
          </p>
          <Header as="h3" content="Privacy Page" />
          <p>
            Proident ipsum amet eu ut magna ex reprehenderit excepteur nisi
            dolore anim veniam commodo id. Sit excepteur ex ad elit consectetur
            elit elit aliqua excepteur nulla excepteur in. Fugiat in consectetur
            amet aliqua ullamco ea elit ex tempor non. Aliqua Lorem et aliquip
            quis quis. Quis ipsum laboris eiusmod laboris qui quis labore culpa
            cupidatat nisi Lorem non. Pariatur eu eiusmod magna mollit commodo
            consequat irure laboris. Ad pariatur ipsum enim ullamco laborum.
          </p>
        </VerticallyPaddedContainer>
      </Container>
    )
  }
}
