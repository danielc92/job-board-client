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
                        <List.Item as={Link} to="/">Home</List.Item>
                        <List.Item as={Link} to="/create-jobs">Post a job</List.Item>
                        <List.Item as={Link} to="/view-jobs">Find a job</List.Item>
                        <List.Item as={Link} to="/news">News</List.Item>
                        <List.Item as={Link} to="/analytics">Analytics</List.Item>
                        <List.Item as={Link} to="/login">Log in</List.Item>
                        <List.Item as={Link} to="/register">Sign Up</List.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Header inverted as='h4' content='Documentation' />
                      <List link inverted>
                        <List.Item as='a'>Terms and conditions</List.Item>
                        <List.Item as='a'>Privacy</List.Item>
                        <List.Item as='a'>FAQ</List.Item>
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

