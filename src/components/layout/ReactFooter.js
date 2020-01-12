import React, { Component } from 'react'
import {
    Grid,
    List,
    Container, 
    Header,
    Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class ReactFooter extends Component {
    render() {
        return (
          <React.Fragment>
            <Segment color={this.props.theme} inverted style={{ borderRadius:'0', padding: '5em 0em', margin: '0' }}>
              <Container>
                <Grid divided inverted stackable>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Header inverted as='h4' content='Navigation' />
                      <List link inverted>
                        <List.Item as={Link} to="/" content="Home" />
                        <List.Item as={Link} to="/view-jobs" content="Find a job" />
                        <List.Item as={Link} to="/create-jobs" content="Post a job (employer only)" />
                        <List.Item as={Link} to="/dashboard" content="Dashboard" />
                        <List.Item as={Link} to="/news" content="News" />
                        <List.Item as={Link} to="/sign-in" content="Sign in" />
                        <List.Item as={Link} to="/register" content="Register" />
                      </List>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Header inverted as='h4' content='Documentation' />
                      <List link inverted>
                        <List.Item as='a' content="Terms and conditions" />
                        <List.Item as='a' content="Privacy" />
                        <List.Item as='a' content="FAQ" />
                      </List>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Header inverted as='h4' content='Contact' />
                      <List link inverted>
                        <List.Item as='a'>Send feedback</List.Item>
                      </List>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Segment 
            color="black"
            inverted 
            style={{borderRadius: '0', textAlign: 'center', margin: '0'}}>
              Created with <span role="img" aria-label="with-love-heart">❤️</span> by Daniel Corcoran.
            </Segment>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(ReactFooter)


