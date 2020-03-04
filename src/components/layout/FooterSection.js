import React, { Component, Fragment } from 'react'
import { Grid, List, Container, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class FooterSection extends Component {
  render() {
    return (
      <Fragment>
        <Segment
          color={this.props.theme}
          inverted
          style={{ borderRadius: '0', padding: '5em 0em', margin: '0' }}
        >
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header inverted as="h4" content="Navigation" />
                  <List link inverted>
                    <List.Item as={Link} to="/" content="Home" />
                    <List.Item as={Link} to="/job-list" content="Find a job" />
                    <List.Item
                      as={Link}
                      to="/create-jobs"
                      content="Post a job (employer only)"
                    />
                    <List.Item as={Link} to="/dashboard" content="Dashboard" />
                    <List.Item as={Link} to="/news" content="News" />
                    <List.Item as={Link} to="/sign-in" content="Sign in" />
                    <List.Item as={Link} to="/register" content="Register" />
                  </List>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header inverted as="h4" content="Documentation" />
                  <List link inverted>
                    <List.Item
                      as={Link}
                      to="/documentation/terms-of-use"
                      content="Terms of use"
                    />
                    <List.Item
                      as={Link}
                      to="/documentation/privacy-policy"
                      content="Privacy policy"
                    />
                    <List.Item
                      as={Link}
                      to="/documentation/frequently-asked-questions-faq"
                      content="FAQ"
                    />
                  </List>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header inverted as="h4" content="Contact" />
                  <List link inverted>
                    <List.Item as={Link} to="/provide-feedback">
                      Send feedback
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Segment
          color="black"
          inverted
          basic
          textAlign="center"
          style={{ margin: '0' }}
        >
          Created with{' '}
          <span role="img" aria-label="with-love-heart">
            ❤️
          </span>{' '}
          by Daniel Corcoran.
        </Segment>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(FooterSection)
