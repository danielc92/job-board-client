import React, { Component } from 'react';
import { Segment, Container, Header, Grid, Icon} from 'semantic-ui-react';


export default class ReactFeatures extends Component {

    state = {
        featureHeader: "h3",
        featureData: [
          {
            icon: "briefcase",
            title: "Variety",
            content: "Large variety of professions to choose from."
          },
          {
            icon: "user",
            title: "Profile based",
            content: "Optimized for job hunters and employers."
          },
          {
            icon: "database",
            title: "Data driven",
            content: "Optimised search results. CV Free."
          },
          { 
          icon: "chart line", 
          title:"Analytics", 
          content:"Gain insights into the job market."}]
      }

    render() {
        
        const { featureHeader, featureData } = this.state;

        return (
            <Segment style={{ padding: '7em 0em', margin: '0' }}>
            <Container>
              <Header as="h1" textAlign="center" style={{marginBottom: '5rem'}}>Features</Header>
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
