import React, { Component } from 'react'
import {
  Segment,
  Container,
  Label,
  Icon,
  Divider,
  Header,
  Button,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setMenuItem } from '../../actions/menu'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

class ReactNews extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('news')
  }

  render() {
    return (
      <div>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              <Header as="h1">News</Header>
              <p>Read about the latest updates and progress.</p>
              <Divider />
              {new Array(3).fill(null).map(x => (
                <Segment stacked color="green">
                  <Header as="h3">Culpa non eiusmod et dolor.</Header>
                  <p>
                    Mollit ng non fugiat dolore sunodo duis. Aliquip ipsum
                    pariatur ametsse deserunt.
                  </p>
                  <Label.Group>
                    <Label size="tiny" content="Created on 20th August 2019" />
                  </Label.Group>
                  <Button color="green">
                    <Icon name="book" />
                    Read more
                  </Button>
                </Segment>
              ))}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
}

export default connect(null, mapDispatchToProps)(ReactNews)
