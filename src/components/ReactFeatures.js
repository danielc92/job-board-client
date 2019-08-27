import React, { Component } from 'react';
import { Segment, Container, Header, Grid, Icon} from 'semantic-ui-react';


export default class ReactFeatures extends Component {
    render() {
        return (
            <Segment style={{ padding: '5em 0em', margin: '0' }}>
            <Container>
              <Header as="h1" textAlign="center">Features</Header>
              <Grid columns={4} stackable>
                <Grid.Row>
                  {
                    featureData.map(item => (
                      <Grid.Column style={{ textAlign: "center"}}>
                        <Icon name={item.icon} size="big"/>
                        <Header as={featureHeader}>{ item.title }</Header>
                        <p>{ item.content }</p>
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        )
    }
}
