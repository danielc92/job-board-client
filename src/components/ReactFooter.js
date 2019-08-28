import React, { Component } from 'react'
import {
    Grid,
    List,
    Container, 
    Header,
    Segment
} from 'semantic-ui-react';
import { connect } from 'react-redux';


export default class ReactFooter extends Component {
    render() {
        return (
            <Segment color="blue" inverted style={{ borderRadius:'0', padding: '5em 0em', margin: '0' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'></List.Item>
                <List.Item as='a'></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Documentation' />
              <List link inverted>
                <List.Item as='a'>Terms and conditions</List.Item>
                <List.Item as='a'>Privacy</List.Item>
                <List.Item as='a'>FAQ</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Irure i Veniam eu aliqua qui sunt laboris laborum non deserunt. Voluptate occaecat ea aute dolore irure.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
        )
    }
}


