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
import image from 'images/undraw_interview_rmcf.svg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import BannerSeperator from './BannerSeperator'

class MainBannerSection extends Component {
  render() {
    return (
      <section style={{ position: 'relative' }}>
        <Segment basic style={{ margin: 0 }}>
          <Container>
            <VerticallyPaddedContainer size="5">
              <Grid divided="vertically" stackable>
                <Grid.Row columns={2}>
                  <Grid.Column verticalAlign="middle">
                    <Header
                      as="h1"
                      style={{ fontSize: '3rem' }}
                      content="Welcome to Daniel's Job Board."
                    />
                    <p>
                      Irure nostrud ea aliqua incididunt ex irure sint
                      excepteur.
                    </p>
                    <Button
                      to="/job-list"
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
        <BannerSeperator fillColor="#f9f9f9" backgroundColor="#fff" />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(MainBannerSection)
