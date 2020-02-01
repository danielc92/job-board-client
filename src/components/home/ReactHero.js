import React, { Component } from 'react'
import {
  Grid,
  Container,
  Segment,
  Header,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react'
import image from '../../images/undraw_interview_rmcf.svg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

class ReactHero extends Component {
  render() {
    return (
      <Segment basic>
        <Container>
          <VerticallyPaddedContainer size="5">
            <Grid divided="vertically" stackable>
              <Grid.Row columns={2}>
                <Grid.Column verticalAlign="middle">
                  <Header as="h1" style={{ fontSize: '3rem' }}>
                    Welcome to Daniel's Job Board.
                    <Header.Subheader>
                      Irure nostrud ea aliqua incididunt ex irure sint
                      excepteur.
                    </Header.Subheader>
                  </Header>
                  <Button
                    to="/job/list"
                    as={Link}
                    size="huge"
                    color={this.props.theme}
                  >
                    <Icon name="paper plane"></Icon>Explore Jobs
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image src={image} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </VerticallyPaddedContainer>
        </Container>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ReactHero)
